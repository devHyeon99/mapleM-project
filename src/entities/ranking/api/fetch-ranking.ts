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
  );

  return { ranking: dropUnusedFields(ranking) };
}

/**
 * 날짜별 랭킹 데이터 태그. 넥슨이 올리기 전에 조회돼 빈 결과가 24시간 굳은 항목을
 * 크론이 올라온 걸 확인한 시점에 털어내는 용도
 */
export const rankingDataTag = (date: string) => `ranking-data:${date}`;

// 데이터 캐시는 unstable_cache 한 겹만 둔다. fetch 에 force-cache 를 같이 걸면
// 같은 응답이 ISR 쓰기로 두 번 잡힘
export const fetchRankingCached = (
  type: RankingType,
  date: string,
  worldName: string | undefined,
  page: number,
) =>
  unstable_cache(
    async () => _fetchRanking({ type, date, worldName, page }),
    ["ranking-fetch-v2", type, date, worldName ?? "all", String(page)],
    { revalidate: 86400, tags: [rankingDataTag(date)] },
  )();
