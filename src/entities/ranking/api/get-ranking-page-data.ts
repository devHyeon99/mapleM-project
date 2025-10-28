import type { RankingType } from "../model/types/ranking";
import { getRankingDate } from "../lib/get-ranking-date";
import { handleCommonNexonError } from "@/shared/api/nexon";
import { getRankingTotalPages } from "./get-ranking-total-pages";
import { RANKING_UI_PAGES_PER_API_PAGE } from "../model/constants";
import {
  normalizeRankingPage,
  normalizeRankingWorldName,
} from "../lib/ranking-query";
import { fetchRankingCached } from "./fetch-ranking";

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
