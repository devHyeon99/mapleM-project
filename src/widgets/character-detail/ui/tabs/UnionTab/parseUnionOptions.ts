import type { UnionOption } from "@/entities/character";

/** 옵션 값 뒤에 붙는 숫자를 라벨과 분리 (1,000 같은 콤마 표기 보호) */
const OPTION_VALUE_PATTERN = /^(.*\S)\s+([-+]?\d[\d,]*(?:\.\d+)?%?)$/;

/** 문자열/배열 두 가지 응답 형태를 옵션 문자열 목록으로 통일 */
export const parseUnionOptions = (
  options: string | UnionOption[] | null | undefined,
): string[] => {
  if (!options) return [];
  if (Array.isArray(options)) {
    return options.map((opt) => `${opt.option_name} ${opt.option_value}`);
  }
  // 숫자 사이의 콤마는 구분자가 아니므로 제외
  return options.split(/,(?!\d)/).map((opt) => opt.trim());
};

/** "STR 1,000" -> { label: "STR", value: "1,000" }. 값이 없으면 value는 null */
export const splitUnionOptionValue = (option: string) => {
  const trimmed = option.trim();
  const match = trimmed.match(OPTION_VALUE_PATTERN);
  if (!match) return { label: trimmed, value: null };
  return { label: match[1], value: match[2] };
};
