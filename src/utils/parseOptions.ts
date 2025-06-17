/**
 * 문자열로 된 옵션을 "옵션명 / 값" 형태로 분리
 * 예: "최대 HP 10,000, 치명타 피해 15%" →
 *     [{ name: "최대 HP", value: "10,000" }, { name: "치명타 피해", value: "15%" }]
 */
export function parseOptions(
  optionString: string,
): { name: string; value: string }[] {
  if (!optionString) return [];

  return optionString
    .split(/,\s+/) // 콤마 + 공백 기준 분리
    .map((opt) => {
      const match = opt.match(/^(.+?)\s([\d,]+%?)$/);
      if (match) {
        return { name: match[1], value: match[2] };
      }
      return { name: opt, value: "" };
    });
}
