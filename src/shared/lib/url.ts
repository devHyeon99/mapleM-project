/**
 * decodeURIComponent를 안전하게 감싼다.
 * 잘못된 퍼센트 인코딩(예: 단독 "%", "%ZZ")이 들어와도 URIError를 던지지 않고
 * 원본 문자열을 그대로 반환한다.
 */
export function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
