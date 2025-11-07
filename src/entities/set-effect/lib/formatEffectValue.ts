import { EffectUnit } from "../model";

export function formatEffectValue(value: number | null, unit: EffectUnit) {
  if (value == null) return "-";
  if (unit === "%") return `${value.toFixed(1)}%`;
  return value.toLocaleString("ko-KR");
}
