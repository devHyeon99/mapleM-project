import { nexonFetch } from "@/shared/api/nexon/server";
import type {
  RankingType,
  RankingResponse,
  AnyRankingData,
} from "../model/types/ranking";

interface FetchRankingParams {
  type: RankingType;
  worldName?: string;
  date: string;
  page: number;
}

export async function fetchRanking({
  type,
  worldName,
  date,
  page,
}: FetchRankingParams): Promise<RankingResponse<AnyRankingData>> {
  const queryParams = new URLSearchParams({
    date,
    page: page.toString(),
  });

  if (worldName) {
    queryParams.append("world_name", worldName);
  }

  return nexonFetch<RankingResponse<AnyRankingData>>(
    `/ranking/${type}?${queryParams.toString()}`,
    {
      next: {
        revalidate: 86400,
        tags: ["ranking", `ranking-${date}`],
      },
    },
  );
}
