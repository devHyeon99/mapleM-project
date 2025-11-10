import { OPTION_ALIASES } from "./optionConstants";

export interface ParsedOption {
  raw: string;
  name: string;
  normalizedName: string;
  numericValue: number | null;
  unit: "%" | "";
  valueText: string;
}

// 옵션명을 공백/별칭 기준으로 정규화
export function normalizeOptionName(name: string): string {
  const compact = name.replace(/\s+/g, " ").trim();
  return OPTION_ALIASES[compact] ?? compact;
}

// 옵션 값 문자열에서 숫자만 추출해 안전하게 number로 변환
export function parseNumericOptionValue(
  value: string | null | undefined,
): number {
  if (!value) return 0;
  const numeric = Number.parseFloat(
    value.replace(/,/g, "").replace(/[^0-9.+-]/g, ""),
  );
  return Number.isFinite(numeric) ? numeric : 0;
}

// API 옵션 필드(option_name, option_value)를 표준 옵션 구조로 변환
export function parseItemOption(
  optionName: string | null,
  optionValue: string | null,
): ParsedOption {
  const name = optionName?.trim() ?? "";
  const normalizedName = normalizeOptionName(name);
  const numericValue = parseNumericOptionValue(optionValue);
  const unit = optionValue?.includes("%") ? "%" : "";

  return {
    raw: `${name} ${optionValue ?? ""}`.trim(),
    name,
    normalizedName,
    numericValue,
    unit,
    valueText: optionValue ?? "",
  };
}
