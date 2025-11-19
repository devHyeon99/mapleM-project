import { COLOR_RANGE_LABEL } from "@/shared/config/constants/color_prism";
import { CashItemEquipment } from "@/entities/cash-item";

interface Props {
  coloringPrism: CashItemEquipment["cash_item_coloring_prism"];
}

// +, - 부호 및 숫자 0을 처리하는 헬퍼 함수
const formatPrismValue = (val: number | null | undefined) => {
  if (val === null || val === undefined) return "0";
  return `${val > 0 ? "+" : ""}${val}`;
};

export const ItemCashColoringPrism = ({ coloringPrism }: Props) => {
  if (!coloringPrism) {
    return null;
  }

  const { color_range, hue, saturation, value } = coloringPrism;
  const colorRangeLabel = color_range ? COLOR_RANGE_LABEL[color_range] : "";

  return (
    <div className="border-divider border-b py-1 text-sm">
      <p>컬러링 프리즘</p>
      <dl>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">적용 범위</dt>
          <dd
            className="text-right text-orange-400"
            aria-label={`적용 범위: ${colorRangeLabel}`}
          >
            {colorRangeLabel}
          </dd>
        </div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">색조</dt>
          <dd
            className="text-right text-orange-400 tabular-nums"
            aria-label={`색조 값: ${hue ?? 0}`}
          >
            {formatPrismValue(hue)}
          </dd>
        </div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">채도</dt>
          <dd
            className="text-right text-orange-400 tabular-nums"
            aria-label={`채도 값: ${saturation ?? 0}`}
          >
            {formatPrismValue(saturation)}
          </dd>
        </div>
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">명도</dt>
          <dd
            className="text-right text-orange-400 tabular-nums"
            aria-label={`명도 값: ${value ?? 0}`}
          >
            {formatPrismValue(value)}
          </dd>
        </div>
      </dl>
    </div>
  );
};
