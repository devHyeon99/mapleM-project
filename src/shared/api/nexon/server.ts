import "server-only";
import { NexonApiError } from "./errors";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";

interface NexonFetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
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

    if (errorData?.error?.name) {
      throw new NexonApiError(errorData.error.name, errorData.error.message);
    }

    throw new Error(`Nexon API 요청 실패: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}
