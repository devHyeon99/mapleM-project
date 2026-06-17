import "server-only";
import { unstable_cache } from "next/cache";
import { nexonFetch } from "@/shared/api/nexon/server";
import type { LevelRanking, RankingResponse } from "../model/types/ranking";

/**
 * ocid 로 레벨 랭킹 한 건을 조회한다.
 * 랭킹 API 는 전체 10,000위까지만 집계하므로 그 밖의 캐릭터는 빈 배열이 온다.
 */
async function _findLevelRankingByOcid(ocid: string, date: string) {
  const { ranking } = await nexonFetch<RankingResponse<LevelRanking>>(
    `/ranking/level?date=${date}&ocid=${encodeURIComponent(ocid)}`,
    { cache: "force-cache" },
  );

  return ranking[0] ?? null;
}

export const findLevelRankingByOcid = (ocid: string, date: string) =>
  unstable_cache(
    async () => _findLevelRankingByOcid(ocid, date),
    ["ranking-find-by-ocid-v1", ocid, date],
    { revalidate: 86400 },
  )();
