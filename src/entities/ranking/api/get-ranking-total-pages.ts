import "server-only";
import { unstable_cache } from "next/cache";
import type { RankingType } from "../model/types/ranking";
import {
  RANKING_MAX_API_PAGE,
  RANKING_MAX_UI_PAGE,
  RANKING_UI_ITEMS_PER_PAGE,
  RANKING_UI_PAGES_PER_API_PAGE,
} from "../model/constants";
import { fetchRankingCached } from "./fetch-ranking";

interface TotalPagesParams {
  type: RankingType;
  date: string;
  worldName?: string;
}

async function calculateRankingTotalPages({
  type,
  date,
  worldName,
}: TotalPagesParams): Promise<number> {
  if (!worldName) return RANKING_MAX_UI_PAGE;

  const pageCache = new Map<number, number>();

  const getCount = async (apiPage: number) => {
    const cached = pageCache.get(apiPage);
    if (cached !== undefined) return cached;

    const response = await fetchRankingCached(type, date, worldName, apiPage);
    const count = response.ranking.length;
    pageCache.set(apiPage, count);
    return count;
  };

  const firstCount = await getCount(1);
  if (firstCount === 0) return 1;

  const lastCountAtMax = await getCount(RANKING_MAX_API_PAGE);
  if (lastCountAtMax > 0) return RANKING_MAX_UI_PAGE;

  let low = 1;
  let high = 2;

  while (high < RANKING_MAX_API_PAGE) {
    const count = await getCount(high);
    if (count === 0) break;
    low = high;
    high = Math.min(high * 2, RANKING_MAX_API_PAGE);
  }

  while (low + 1 < high) {
    const mid = Math.floor((low + high) / 2);
    const count = await getCount(mid);
    if (count > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const lastApiPage = low;
  const lastApiCount = await getCount(lastApiPage);

  const pagesBeforeLast = (lastApiPage - 1) * RANKING_UI_PAGES_PER_API_PAGE;
  const pagesInLast = Math.ceil(lastApiCount / RANKING_UI_ITEMS_PER_PAGE);

  return Math.max(1, pagesBeforeLast + pagesInLast);
}

const getRankingTotalPagesCached = (
  type: RankingType,
  date: string,
  worldName?: string,
) =>
  unstable_cache(
    async () => calculateRankingTotalPages({ type, date, worldName }),
    ["ranking-total-pages", type, date, worldName ?? "all"],
    { revalidate: 86400 },
  )();

export async function getRankingTotalPages(
  params: TotalPagesParams,
): Promise<number> {
  return getRankingTotalPagesCached(params.type, params.date, params.worldName);
}
