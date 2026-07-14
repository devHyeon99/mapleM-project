/** 만 단위로 끊어 읽는 자리. 큰 것부터 훑어야 몫이 그 단위의 값이 됨. */
const UNITS = [
  [1_0000_0000_0000, "조"],
  [1_0000_0000, "억"],
  [1_0000, "만"],
] as const;

/**
 * 쉼표 대신 한국어 단위로 끊어 읽는 수 표기.
 * 전투력처럼 자릿수가 커서 쉼표만으로는 규모가 안 잡히는 값에 씀.
 *
 * ```
 * 2091045036 → "20억 9104만 5036"
 * 20000000   → "2000만"
 * ```
 */
export function formatKoreanNumber(value: number): string {
  if (!Number.isFinite(value) || Math.trunc(value) === 0) return "0";

  const sign = value < 0 ? "-" : "";
  let rest = Math.abs(Math.trunc(value));
  const parts: string[] = [];

  for (const [unit, label] of UNITS) {
    const quotient = Math.floor(rest / unit);
    // 빈 자리는 건너뜀. 2억 5천만 원이 아니라 "2억 5000만" 이면 충분함.
    if (quotient > 0) parts.push(`${quotient}${label}`);
    rest %= unit;
  }

  if (rest > 0) parts.push(String(rest));

  return sign + parts.join(" ");
}
