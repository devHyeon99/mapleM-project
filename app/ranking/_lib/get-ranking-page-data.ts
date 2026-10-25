import {
  RANKING_UI_ITEMS_PER_PAGE,
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

    const { ranking } = await fetchRankingCached(type, date, worldName, apiPage);

    // API 는 200행씩 주는데 화면은 20행만 쓴다. 여기서 잘라야 나머지 180행이
    // RSC 페이로드로 직렬화돼 브라우저까지 따라오지 않음.
    const offset =
      ((uiPage - 1) % RANKING_UI_PAGES_PER_API_PAGE) * RANKING_UI_ITEMS_PER_PAGE;

    return {
      data: {
        ranking: ranking.slice(offset, offset + RANKING_UI_ITEMS_PER_PAGE),
      },
      params: { worldName, date, page: uiPage, totalPages },
    };
  } catch (error) {
    handleCommonNexonError(error);
    throw error;
  }
}
