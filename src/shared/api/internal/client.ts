import type { ApiResponse } from "@/shared/model/types/ApiResponse";

export interface InternalFetchOptions {
  /** fetch에 그대로 전달되는 RequestInit (cache는 기본 no-store). */
  init?: RequestInit;
  /**
   * 도메인 특화 에러 문구 오버라이드. 미지정 시 공통 기본 문구를 사용한다.
   * 단, 응답 본문에 error.message가 있으면 그쪽이 항상 우선한다.
   */
  messages?: {
    /** HTTP 실패 시 문구. status를 받아 메시지를 구성한다. */
    requestFailed?: (status: number) => string;
    /** 정상 응답이지만 data가 없을 때의 문구. */
    empty?: string;
  };
}

/**
 * 내부 /api/* 라우트 호출용 공통 fetch 헬퍼.
 *
 * ApiResponse 봉투를 풀어 data만 반환하며, 다음 경우를 모두 예외로 변환한다.
 * - HTTP 상태 실패 (!res.ok)
 * - 응답 본문에 error 객체 포함
 * - 정상 응답이지만 data 없음
 *
 * JSON 파싱 실패 시 빈 객체로 폴백하여 런타임 에러를 방지한다.
 */
export async function internalFetch<T>(
  path: string,
  options?: InternalFetchOptions,
): Promise<T> {
  const { init, messages } = options ?? {};

  const res = await fetch(path, { cache: "no-store", ...init });

  const json = (await res.json().catch(() => ({}))) as ApiResponse<T>;

  if (!res.ok) {
    throw new Error(
      json?.error?.message ??
        messages?.requestFailed?.(res.status) ??
        `API 요청 실패: ${res.status}`,
    );
  }
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error(messages?.empty ?? "데이터가 없습니다.");

  return json.data;
}
