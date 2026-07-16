import "server-only";
import { unstable_cache } from "next/cache";
import { nexonFetch } from "@/shared/api/nexon/server";
import type {
  RankingType,
  RankingResponse,
  AnyRankingData,
} from "../model/types/ranking";

/**
 * 응답엔 오지만 어느 화면에서도 그리지 않는 필드.
 * 174자짜리 URL 이 행마다 붙어 있어 두면 데이터 캐시와 RSC 페이로드에 그대로 실림.
 */
const UNUSED_FIELDS = ["union_grade_icon", "achievement_grade_icon"];

const dropUnusedFields = (rows: AnyRankingData[]): AnyRankingData[] =>
  rows.map((row) => {
    const kept: Record<string, unknown> = { ...row };
    for (const field of UNUSED_FIELDS) delete kept[field];
    return kept as unknown as AnyRankingData;
  });

type Args = {
  type: RankingType;
  worldName?: string;
  date: string;
  page: number;
};

async function _fetchRanking({ type, worldName, date, page }: Args) {
  const queryParams = new URLSearchParams({ date, page: String(page) });
  if (worldName) queryParams.append("world_name", worldName);

  const { ranking } = await nexonFetch<RankingResponse<AnyRankingData>>(
    `/ranking/${type}?${queryParams.toString()}`,
    {
      cache: "force-cache",
    },
  );

  return { ranking: dropUnusedFields(ranking) };
}

export const fetchRankingCached = (
  type: RankingType,
  date: string,
  worldName: string | undefined,
  page: number,
) =>
  unstable_cache(
    async () => _fetchRanking({ type, date, worldName, page }),
    ["ranking-fetch-v2", type, date, worldName ?? "all", String(page)],
    { revalidate: 86400 },
  )();
