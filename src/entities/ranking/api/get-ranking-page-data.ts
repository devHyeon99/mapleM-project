import { unstable_cache } from "next/cache";
import { format } from "date-fns";
import { fetchRanking } from "./fetch-ranking";
import type { RankingType } from "../model/types/ranking";
import { getRankingDate } from "../lib/get-ranking-date";
import { handleCommonNexonError } from "@/shared/api/nexon";

// 캐싱 하루 1회 갱신 (86400초)
const getCachedRanking = unstable_cache(
  async (params: Parameters<typeof fetchRanking>[0]) => {
    return fetchRanking(params);
  },
  ["ranking-data"],
  {
    revalidate: 86400, // 24시간
    tags: ["ranking"],
  },
);

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

  const targetDate = getRankingDate();
  const date = format(targetDate, "yyyy-MM-dd");

  try {
    // --- 캐시된 데이터 호출 ---
    const data = await getCachedRanking({
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
    // 공유 유틸리티를 사용해 에러 표준화
    // (점검 중, 키 만료, 호출량 초과 등 공통 에러를 잡아서 Throw)
    handleCommonNexonError(error);

    // handleCommonNexonError에서 걸러지지 않은 기타 에러는 그대로 던짐
    // -> page.tsx의 error.tsx 혹은 global-error.tsx가 처리
    throw error;
  }
}
