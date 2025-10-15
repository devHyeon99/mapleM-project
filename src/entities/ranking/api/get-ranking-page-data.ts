import { QueryClient, dehydrate } from "@tanstack/react-query";
import { format } from "date-fns";
import { getRanking } from "./get-ranking";
import { rankingQueryKeys } from "../model/queries/query-keys";
import { getRankingDate } from "../lib/get-ranking-date";
import type { RankingType } from "../model/types/ranking";

export async function getRankingPageData(
  type: RankingType,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  const queryClient = new QueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const worldName =
    typeof searchParams.world_name === "string"
      ? searchParams.world_name
      : undefined;

  const targetDate = getRankingDate();
  const date = format(targetDate, "yyyy-MM-dd");

  const uiPage =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const apiPage = Math.ceil(uiPage / 10);

  const apiFilters = { worldName, date, page: apiPage };
  const queryKey = rankingQueryKeys.list(type, apiFilters);

  try {
    await queryClient.fetchQuery({
      queryKey,
      queryFn: () => getRanking({ type, ...apiFilters, baseUrl }),
    });
  } catch (e) {
    console.error(`${type} 랭킹 Prefetch 실패:`, e);
  }

  return {
    dehydratedState: dehydrate(queryClient),
    params: { worldName, date, page: uiPage },
  };
}
