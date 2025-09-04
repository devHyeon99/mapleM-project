import "server-only";

import { nexonFetch } from "@/shared/api/nexon/server";
import { NexonApiError } from "@/shared/api/nexon";

const getDateString = (daysToSubtract: number): string => {
  const date = new Date(Date.now() - daysToSubtract * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString("fr-CA", { timeZone: "Asia/Seoul" });
};

const toShortError = (e: unknown) => {
  if (e instanceof NexonApiError) {
    return `${e.code}: ${e.message}`;
  }
  if (e instanceof Error) {
    return e.message;
  }
  return String(e);
};

export async function fetchRankingWithFallback<T>(
  endpointBase: string,
  ocid: string,
): Promise<T | null> {
  const today = getDateString(0);
  const yesterday = getDateString(1);
  const ocidQ = encodeURIComponent(ocid);

  try {
    return await nexonFetch<T>(`${endpointBase}?date=${today}&ocid=${ocidQ}`, {
      cache: "no-store",
    });
  } catch (e1) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `[Ranking] 1차 실패(${today}) → 2차(${yesterday}) \n ${toShortError(e1)}`,
      );
    }

    try {
      return await nexonFetch<T>(
        `${endpointBase}?date=${yesterday}&ocid=${ocidQ}`,
        { cache: "no-store" },
      );
    } catch (e2) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Ranking] 2차 실패(${yesterday}) → null \n ${toShortError(e2)}`,
        );
      }
      return null;
    }
  }
}
