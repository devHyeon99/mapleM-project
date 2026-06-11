import "server-only";
import { unstable_cache } from "next/cache";
import { RANKING_MAX_API_PAGE } from "../model/constants";
import { tallyWorldCounts } from "../lib/tallyWorldCounts";
import { fetchRankingCached } from "./fetch-ranking";

/**
 * 전체 월드 레벨 랭킹 10,000위(200행 * 50페이지) 안에 월드별로 몇 캐릭터가 있는지 센다.
 * 페이지 응답 자체는 fetchRankingCached 가 랭킹 페이지와 같은 키로 캐싱하므로 중복 호출되지 않는다.
 */
async function countLevelRankingByWorld(date: string) {
  const pages = await Promise.all(
    Array.from({ length: RANKING_MAX_API_PAGE }, (_, i) =>
      fetchRankingCached("level", date, undefined, i + 1),
    ),
  );

  return tallyWorldCounts(pages.flatMap((page) => page.ranking));
}

export const getLevelWorldCharacterCounts = (date: string) =>
  unstable_cache(
    async () => countLevelRankingByWorld(date),
    ["ranking-level-world-counts-v1", date],
    { revalidate: 86400 },
  )();
