import {
  RANKING_UI_PAGES_PER_API_PAGE,
  type RankingType,
} from "@/entities/ranking";
import {
  fetchRankingCached,
  getRankingTotalPages,
  resolveRankingDate,
} from "@/entities/ranking/server";
import { handleCommonNexonError } from "@/shared/api/nexon";
import type { RankingFilters } from "./ranking-query";

export async function getRankingPageData(
  type: RankingType,
  { worldName, page: requestedPage }: RankingFilters,
) {
  const date = await resolveRankingDate();

  try {
    const totalPages = await getRankingTotalPages({
      type,
      date,
      worldName,
    });

    const uiPage = Math.min(Math.max(requestedPage, 1), totalPages);
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
