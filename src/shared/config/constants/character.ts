/** 클라이언트 입력 검증과 서버 진입 검증이 같은 규칙을 쓰도록 한 곳에 둠 */
export const CHARACTER_NAME_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
export const CHARACTER_NAME_ERROR =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";
