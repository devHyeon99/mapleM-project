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
