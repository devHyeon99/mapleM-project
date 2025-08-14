// 넥슨 API 에러 코드 상수
export const NEXON_ERROR_CODE = {
  INTERNAL_SERVER_ERROR: "OPENAPI00001", // 서버 내부 오류 (500)
  FORBIDDEN: "OPENAPI00002", // 권한이 없는 경우 (403)
  BAD_REQUEST_ID: "OPENAPI00003", // 유효하지 않은 식별자 (400)
  BAD_REQUEST_PARAM: "OPENAPI00004", // 파라미터 누락/유효하지 않음 (400)
  INVALID_API_KEY: "OPENAPI00005", // 유효하지 않은 API KEY (400)
  INVALID_PATH: "OPENAPI00006", // 유효하지 않은 게임 또는 API PATH (400)
  TOO_MANY_REQUESTS: "OPENAPI00007", // API 호출량 초과 (429)
  DATA_PREPARING: "OPENAPI00009", // 데이터 준비중 (400)
  GAME_MAINTENANCE: "OPENAPI00010", // 게임 점검 중 (400)
  API_MAINTENANCE: "OPENAPI00011", // API 점검 중 (503)
} as const;

export type NexonErrorCode =
  (typeof NEXON_ERROR_CODE)[keyof typeof NEXON_ERROR_CODE];

//  커스텀 에러 클래스
export class NexonApiError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "NexonApiError";
    this.code = code;
  }

  // 특정 에러 코인지 확인하는 헬퍼 메서드
  is(code: NexonErrorCode): boolean {
    return this.code === code;
  }
}
