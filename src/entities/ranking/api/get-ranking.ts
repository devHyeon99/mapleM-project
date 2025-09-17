import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type {
  RankingType,
  RankingResponse,
  AnyRankingData,
} from "../model/types/ranking";

interface GetRankingParams {
  type: RankingType;
  date?: string;
  worldName?: string;
  ocid?: string;
  page?: number;
}

/**
 * 특정 타입의 랭킹 정보를 조회
 */
export async function getRanking<T = AnyRankingData>({
  type,
  date,
  worldName,
  ocid,
  page = 1,
  baseUrl = "", // baseUrl 추가
}: GetRankingParams & { baseUrl?: string }): Promise<RankingResponse<T>> {
  const query = new URLSearchParams({
    page: String(page),
  });

  if (date) query.append("date", date);
  if (worldName) query.append("world_name", worldName);
  if (ocid) query.append("ocid", ocid);

  // baseUrl을 결합하여 절대 경로로 호출 가능하게 수정
  const res = await fetch(
    `${baseUrl}/api/ranking/${type}?${query.toString()}`,
    {
      next: {
        revalidate: 3600, // 1시간 동안 캐시 유지 (동일한 파라미터 요청 시 API 호출 안 함)
        tags: [`ranking-${type}`], // 나중에 캐시 초기화가 필요할 때 사용할 태그
      },
    },
  );

  const json = (await res.json().catch(() => ({}))) as ApiResponse<
    RankingResponse<T>
  >;

  if (!res.ok)
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error("랭킹 데이터를 찾을 수 없습니다.");

  return json.data;
}
