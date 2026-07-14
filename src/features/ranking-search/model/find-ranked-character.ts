import "server-only";
import { fetchOcid } from "@/entities/character/server";
import {
  RANKING_UI_ITEMS_PER_PAGE,
  type RankingType,
} from "@/entities/ranking";
import {
  findRankingByOcid,
  resolveRankingDate,
} from "@/entities/ranking/server";
import { handleCommonNexonError } from "@/shared/api/nexon";
import type { RankingSearchQuery } from "./params";
import type { RankingSearchResult } from "./types";

/**
 * 월드+닉네임으로 ocid 를 얻고, 그 ocid 로 해당 종류의 랭킹을 조회한다.
 *
 * 검색 실패가 랭킹 페이지 전체를 죽이면 안 되므로 throw 하지 않고 결과로 돌려준다.
 */
export async function findRankedCharacter(
  type: RankingType,
  query: RankingSearchQuery,
): Promise<RankingSearchResult> {
  try {
    const character = await fetchOcid(query.world, query.name);
    if (!character) return { status: "no-character" };

    const date = await resolveRankingDate();
    const entry = await findRankingByOcid(type, character.ocid, date);
    if (!entry) return { status: "unranked" };

    // 전체 목록은 ranking 이, 월드 필터를 건 목록은 world_ranking 이 1부터
    // 빈틈없이 이어지므로 페이지를 바로 계산할 수 있다.
    return {
      status: "ranked",
      entry,
      overallPage: Math.ceil(entry.ranking / RANKING_UI_ITEMS_PER_PAGE),
      worldPage: Math.ceil(entry.world_ranking / RANKING_UI_ITEMS_PER_PAGE),
    };
  } catch (error) {
    try {
      handleCommonNexonError(error);
    } catch (mapped) {
      return { status: "error", message: (mapped as Error).message };
    }

    console.error("[랭킹 검색] 조회에 실패했습니다.", error);
    return {
      status: "error",
      message: "검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }
}
