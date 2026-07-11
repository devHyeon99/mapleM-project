const SYMBOL_FORCE_PATTERN =
  /(아케인포스|어센틱포스)\s*(?:증가)?\s*(?:[:+]|:\s*\+)?\s*([0-9,]+)/;

export function parseSymbolForce(option: string): number {
  const match = option.match(SYMBOL_FORCE_PATTERN);
  if (!match) return 0;

  const value = Number.parseInt(match[2].replaceAll(",", ""), 10);
  return Number.isFinite(value) ? value : 0;
}

export function sumSymbolForce<T extends { symbol_option: string }>(
  symbols: T[] | null | undefined,
): number {
  if (!Array.isArray(symbols) || symbols.length === 0) return 0;

  return symbols.reduce((total, symbol) => {
    return total + parseSymbolForce(symbol.symbol_option);
  }, 0);
}

// 옵션 항목 끝의 숫자(부호·콤마·소수점·% 허용)를 값으로 본다
const OPTION_VALUE_PATTERN = /([+-]?[0-9][0-9,]*(?:\.[0-9]+)?)\s*(%?)\s*$/;

/** "STR 증가 : +1,500, 최대 HP +5%" 처럼 나열된 옵션을 항목별로 쪼갠다 */
export function parseSymbolOptions(
  option: string,
): { name: string; value: number; percent: boolean }[] {
  if (!option) return [];

  return option
    // 천 단위 콤마(뒤가 숫자)는 항목 구분자가 아니다
    .split(/,(?!\d)|\n/)
    .map((part) => {
      const match = part.trim().match(OPTION_VALUE_PATTERN);
      if (!match) return null;

      const name = part
        .trim()
        .slice(0, match.index)
        .replace(/[\s:+]*(?:증가)?[\s:+]*$/, "")
        .trim();
      const value = Number.parseFloat(match[1].replaceAll(",", ""));
      if (!name || !Number.isFinite(value)) return null;

      return { name, value, percent: match[2] === "%" };
    })
    .filter((opt) => opt !== null);
}

/**
 * 심볼 옵션을 항목별로 합산한다.
 * 포스는 별도로 표기하므로 제외하고, 정률·정액은 같은 이름이어도 따로 센다.
 */
export function sumSymbolStats<T extends { symbol_option: string }>(
  symbols: T[] | null | undefined,
): { name: string; value: string }[] {
  if (!Array.isArray(symbols)) return [];

  const totals = new Map<string, { name: string; value: number; percent: boolean }>();

  for (const symbol of symbols) {
    for (const opt of parseSymbolOptions(symbol.symbol_option)) {
      if (opt.name.includes("포스")) continue;

      const key = `${opt.name}|${opt.percent}`;
      const current = totals.get(key);
      if (current) current.value += opt.value;
      else totals.set(key, { ...opt });
    }
  }

  return [...totals.values()].map(({ name, value, percent }) => ({
    name,
    value: `${Number.isInteger(value) ? value.toLocaleString() : value.toFixed(1)}${percent ? "%" : ""}`,
  }));
}
