import { nexonFetch } from "@/shared/api/nexon";

// 날짜 유틸리티
const getDateString = (daysToSubtract: number): string => {
  const date = new Date(Date.now() - daysToSubtract * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString("fr-CA", { timeZone: "Asia/Seoul" });
};

/**
 * 랭킹 조회 전용 Fetcher (Fallback 로직 포함)
 */
export async function fetchRankingWithFallback<T>(
  endpointBase: string,
  ocid: string,
): Promise<T | null> {
  const today = getDateString(0);
  const yesterday = getDateString(1);

  try {
    // 1차 시도 (오늘)
    return await nexonFetch<T>(`${endpointBase}?date=${today}&ocid=${ocid}`, {
      cache: "no-store",
    });
  } catch {
    // 1차 실패 시 로그 (개발 환경에서만 보이게)
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Ranking] 1차 실패(${today}), 2차 시도(${yesterday}) 진입`);
    }

    try {
      // 2차 시도 (어제)
      return await nexonFetch<T>(
        `${endpointBase}?date=${yesterday}&ocid=${ocid}`,
        { cache: "no-store" },
      );
    } catch {
      // 최종 실패
      return null;
    }
  }
}
