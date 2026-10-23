import { NexonApiError, NEXON_ERROR_CODE } from "./errors";

export interface MappedNexonError {
  status: number;
  message: string;
}

/**
 * 넥슨 API 공통 에러를 응답 상태 코드와 사용자용 문구로 변환
 * - 점검 중, API 키 만료, 호출량 초과, 응답 지연 등을 일괄 처리
 * - 정체를 알 수 없는 에러는 null 반환. 처리는 호출부 몫
 */
export const mapNexonError = (error: unknown): MappedNexonError | null => {
  // nexonFetch 의 AbortSignal.timeout 이 끊은 요청
  if (error instanceof DOMException && error.name === "TimeoutError") {
    return {
      status: 504,
      message: "넥슨 서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  if (!(error instanceof NexonApiError)) return null;

  // 점검 중
  if (
    error.is(NEXON_ERROR_CODE.GAME_MAINTENANCE) ||
    error.is(NEXON_ERROR_CODE.API_MAINTENANCE)
  ) {
    return {
      status: 503,
      message: "현재 메이플스토리M 게임 또는 API 점검 중입니다.",
    };
  }

  // 넥슨 쪽 데이터 갱신 중
  if (error.is(NEXON_ERROR_CODE.DATA_PREPARING)) {
    return {
      status: 503,
      message: "넥슨에서 데이터를 준비 중입니다. 잠시 후 다시 시도해주세요.",
    };
  }

  // 넥슨 서버 내부 오류
  if (error.is(NEXON_ERROR_CODE.INTERNAL_SERVER_ERROR)) {
    return {
      status: 502,
      message:
        "넥슨 서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  // API 호출량 초과
  if (error.is(NEXON_ERROR_CODE.TOO_MANY_REQUESTS)) {
    return {
      status: 429,
      message: "서버 요청량이 많아 잠시 후 다시 시도해주세요.",
    };
  }

  // API KEY 관련 문제
  if (
    error.is(NEXON_ERROR_CODE.INVALID_API_KEY) ||
    error.is(NEXON_ERROR_CODE.FORBIDDEN)
  ) {
    console.error("CRITICAL: 넥슨 API 키가 유효하지 않습니다.");
    return {
      status: 500,
      message: "서버 설정 오류로 인해 데이터를 불러올 수 없습니다.",
    };
  }

  // 유효하지 않은 게임/경로
  if (error.is(NEXON_ERROR_CODE.INVALID_PATH)) {
    console.error("DEV ERROR: 잘못된 API 경로 요청");
    return { status: 500, message: "잘못된 요청입니다." };
  }

  // 유효하지 않은 ocid 등 식별자
  if (error.is(NEXON_ERROR_CODE.BAD_REQUEST_ID)) {
    return { status: 400, message: "잘못된 요청입니다." };
  }

  return null;
};

/**
 * 알려진 넥슨 에러면 사용자용 문구로 바꿔 throw, 아니면 그대로 반환
 * - 에러를 위로 전파하는 호출부용. 원본은 cause 로 보존
 */
export const handleCommonNexonError = (error: unknown): void => {
  const mapped = mapNexonError(error);
  if (mapped) throw new Error(mapped.message, { cause: error });
};

/**
 * 조회 대상이 없는 에러인지 확인하는 헬퍼
 * - OPENAPI00004: 없는 이름, 등록되지 않은 하위 리소스
 * - OPENAPI00003: 식별자는 받았지만 상세 조회가 안 되는 대상
 */
export const isNexonNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof NexonApiError &&
    (error.is(NEXON_ERROR_CODE.BAD_REQUEST_PARAM) ||
      error.is(NEXON_ERROR_CODE.BAD_REQUEST_ID))
  );
};
