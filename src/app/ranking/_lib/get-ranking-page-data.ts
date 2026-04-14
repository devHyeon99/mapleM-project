import {
  RANKING_UI_PAGES_PER_API_PAGE,
  type RankingType,
} from "@/entities/ranking";
import {
  fetchRankingCached,
  getRankingTotalPages,
} from "@/entities/ranking/server";
import { getRankingDate } from "@/shared/lib/ranking-date";
import { handleCommonNexonError } from "@/shared/api/nexon";
import {
  normalizeRankingPage,
  normalizeRankingWorldName,
} from "./ranking-query";

export async function getRankingPageData(
  type: RankingType,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  const worldName = normalizeRankingWorldName(searchParams.world_name);
  const date = getRankingDate();

  try {
    const totalPages = await getRankingTotalPages({
      type,
      date,
      worldName,
    });

    const uiPage = normalizeRankingPage(searchParams.page, totalPages);
    const apiPage = Math.ceil(uiPage / RANKING_UI_PAGES_PER_API_PAGE);

    const data = await fetchRankingCached(type, date, worldName, apiPage);

    return {
      data,
      params: { worldName, date, page: uiPage, totalPages },
    };
  } catch (error) {
    handleCommonNexonError(error);
    throw error;
  }
}
