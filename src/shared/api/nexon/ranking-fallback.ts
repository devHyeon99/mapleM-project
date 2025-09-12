import "server-only";
import { nexonFetch } from "@/shared/api/nexon/server";
import { NexonApiError, NEXON_ERROR_CODE } from "@/shared/api/nexon/errors";
import { getTodayDateKST, subtractOneDay } from "@/shared/lib/date";

export async function fetchWithRankingFallback<T>(
  endpoint: string,
  params: Record<string, string | number | undefined>,
  explicitDate?: string,
): Promise<T> {
  const initialDate = explicitDate || getTodayDateKST();

  // 쿼리 조립 함수
  const getQuery = (date: string) => {
    const query = new URLSearchParams();
    query.append("date", date);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) query.append(key, String(value));
    });
    return query.toString();
  };

  try {
    // 1차 시도 (오늘 또는 지정일)
    return await nexonFetch<T>(`${endpoint}?${getQuery(initialDate)}`, {
      cache: "no-store",
    });
  } catch (e) {
    // 날짜를 직접 지정했거나, 에러 코드가 '데이터 준비 중'이 아니면 즉시 throw
    if (
      explicitDate ||
      !(e instanceof NexonApiError && e.is(NEXON_ERROR_CODE.DATA_PREPARING))
    ) {
      throw e;
    }

    const fallbackDate = subtractOneDay(initialDate);
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Ranking Fallback] ${endpoint}: ${initialDate} → ${fallbackDate} 재시도`,
      );
    }

    // 2차 시도 (하루 전)
    return await nexonFetch<T>(`${endpoint}?${getQuery(fallbackDate)}`, {
      cache: "no-store",
    });
  }
}
