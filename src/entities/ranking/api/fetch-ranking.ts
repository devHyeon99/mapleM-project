import "server-only";
import { unstable_cache } from "next/cache";
import { nexonFetch } from "@/shared/api/nexon/server";
import type {
  RankingType,
  RankingResponse,
  AnyRankingData,
} from "../model/types/ranking";

type Args = {
  type: RankingType;
  worldName?: string;
  date: string;
  page: number;
};

async function _fetchRanking({ type, worldName, date, page }: Args) {
  const queryParams = new URLSearchParams({ date, page: String(page) });
  if (worldName) queryParams.append("world_name", worldName);

  return nexonFetch<RankingResponse<AnyRankingData>>(
    `/ranking/${type}?${queryParams.toString()}`,
    {
      cache: "force-cache",
    },
  );
}

export const fetchRankingCached = (
  type: RankingType,
  date: string,
  worldName: string | undefined,
  page: number,
) =>
  unstable_cache(
    async () => _fetchRanking({ type, date, worldName, page }),
    ["ranking-fetch-v1", type, date, worldName ?? "all", String(page)],
    { revalidate: 86400 },
  )();
