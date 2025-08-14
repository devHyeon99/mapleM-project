import { NexonApiError, NEXON_ERROR_CODE } from "./errors";

/**
 * 넥슨 API 공통 에러 처리기
 * - 점검 중, API 키 만료, 호출량 초과 등을 일괄 처리
 */
export const handleCommonNexonError = (error: unknown) => {
  if (error instanceof NexonApiError) {
    // 점검 중
    if (
      error.is(NEXON_ERROR_CODE.GAME_MAINTENANCE) ||
      error.is(NEXON_ERROR_CODE.API_MAINTENANCE)
    ) {
      throw new Error("현재 메이플스토리M 게임 또는 API 점검 중입니다.");
    }

    // 넥슨 서버 내부 오류
    if (error.is(NEXON_ERROR_CODE.INTERNAL_SERVER_ERROR)) {
      throw new Error(
        "넥슨 서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
    }

    // API 호출량 초과
    if (error.is(NEXON_ERROR_CODE.TOO_MANY_REQUESTS)) {
      throw new Error("서버 요청량이 많아 잠시 후 다시 시도해주세요.");
    }

    // API KEY 관련 문제
    if (
      error.is(NEXON_ERROR_CODE.INVALID_API_KEY) ||
      error.is(NEXON_ERROR_CODE.FORBIDDEN)
    ) {
      console.error("CRITICAL: 넥슨 API 키가 유효하지 않습니다.");
      throw new Error("서버 설정 오류로 인해 데이터를 불러올 수 없습니다.");
    }

    // 유효하지 않은 게임/경로
    if (error.is(NEXON_ERROR_CODE.INVALID_PATH)) {
      console.error("DEV ERROR: 잘못된 API 경로 요청");
      throw new Error("잘못된 요청입니다.");
    }
  }
};

/**
 * "데이터 없음/파라미터 오류" (OPENAPI00004) 인지 확인하는 헬퍼
 * - 코드가독성을 위해 분리
 */
export const isNexonNotFoundError = (error: unknown): boolean => {
  return (
    error instanceof NexonApiError &&
    error.is(NEXON_ERROR_CODE.BAD_REQUEST_PARAM)
  );
};
