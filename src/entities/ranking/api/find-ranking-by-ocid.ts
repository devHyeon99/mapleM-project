import "server-only";
import { unstable_cache } from "next/cache";
import { nexonFetch } from "@/shared/api/nexon/server";
import type {
  BaseRanking,
  RankingResponse,
  RankingType,
} from "../model/types/ranking";

/**
 * ocid 로 랭킹 한 건을 조회한다. 샤레니안(길드 랭킹)을 뺀 모든 종류가 ocid 를 받는다.
 * 랭킹 API 는 전체 10,000위까지만 집계하므로 그 밖의 캐릭터는 빈 배열이 온다.
 *
 * 순위 계산에 쓰는 건 ranking/world_ranking 뿐이라 종류별 스탯까지 좁히지 않는다.
 */
async function _findRankingByOcid(
  type: RankingType,
  ocid: string,
  date: string,
) {
  const { ranking } = await nexonFetch<RankingResponse<BaseRanking>>(
    `/ranking/${type}?date=${date}&ocid=${encodeURIComponent(ocid)}`,
    { cache: "force-cache" },
  );

  return ranking[0] ?? null;
}

export const findRankingByOcid = (
  type: RankingType,
  ocid: string,
  date: string,
) =>
  unstable_cache(
    async () => _findRankingByOcid(type, ocid, date),
    ["ranking-find-by-ocid-v2", type, ocid, date],
    { revalidate: 86400 },
  )();
