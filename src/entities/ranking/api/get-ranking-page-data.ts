import { fetchRanking } from "./fetch-ranking";
import type { RankingType } from "../model/types/ranking";
import { getRankingDate } from "../lib/get-ranking-date";
import { handleCommonNexonError } from "@/shared/api/nexon";

export async function getRankingPageData(
  type: RankingType,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  const worldName =
    typeof searchParams.world_name === "string"
      ? searchParams.world_name
      : undefined;

  const uiPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const apiPage = Math.ceil(uiPage / 10);

  const date = getRankingDate();

  try {
    const data = await fetchRanking({
      type,
      worldName,
      date,
      page: apiPage,
    });

    return {
      data,
      params: { worldName, date, page: uiPage },
    };
  } catch (error) {
    handleCommonNexonError(error);
    throw error;
  }
}
