import "server-only";
import { NextResponse } from "next/server";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import { NexonApiError } from "./errors";
import { mapNexonError } from "./handler";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";

// 넥슨이 응답 없이 붙잡고 있을 때 끊는 시간. 평소 응답은 1초 이내
const NEXON_TIMEOUT_MS = 10_000;

export async function nexonFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const apiKey = process.env.NEXON_API_KEY;
  if (!apiKey) {
    throw new Error("ServerConfigError: NEXON_API_KEY가 설정되지 않았습니다.");
  }

  const res = await fetch(`${NEXON_API_BASE_URL}${endpoint}`, {
    ...options,
    signal: options.signal ?? AbortSignal.timeout(NEXON_TIMEOUT_MS),
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

/**
 * API 라우트의 catch 블록용. 넥슨 에러를 알맞은 상태 코드의 JSON 응답으로 변환
 * - 알 수 없는 에러는 원문에 내부 정보가 섞일 수 있어 로그로만 남기고 공통 문구로 응답
 */
export function nexonErrorResponse(error: unknown) {
  const mapped = mapNexonError(error);
  if (mapped) {
    return NextResponse.json<ApiResponse<null>>(
      { error: { name: "NexonCommonError", message: mapped.message } },
      { status: mapped.status },
    );
  }

  console.error("[Nexon API] 알 수 없는 오류", error);
  return NextResponse.json<ApiResponse<null>>(
    {
      error: {
        name: "InternalError",
        message: "데이터를 불러오는 중 오류가 발생했습니다.",
      },
    },
    { status: 500 },
  );
}
