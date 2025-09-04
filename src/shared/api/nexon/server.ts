import "server-only";

import { NexonApiError } from "./errors";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";

interface NexonFetchOptions extends RequestInit {
  cache?: RequestCache;
}

export async function nexonFetch<T>(
  endpoint: string,
  options: NexonFetchOptions = {},
): Promise<T> {
  const apiKey = process.env.NEXON_API_KEY;
  if (!apiKey) {
    throw new Error("ServerConfigError: NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const res = await fetch(`${NEXON_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "x-nxopen-api-key": apiKey,
      ...(options.headers ?? {}),
    },
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => null)) as {
      error?: { name: string; message: string };
    } | null;

    // 넥슨 API 에러 포맷이면 커스텀 에러로 통일
    if (errorData?.error?.name) {
      throw new NexonApiError(errorData.error.name, errorData.error.message);
    }

    // 그 외 (네트워크/프록시/예상치 못한 응답)
    throw new Error(`Nexon API 요청 실패: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}
