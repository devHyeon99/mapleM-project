"use client";

import { Separator } from "@/shared/ui/separator";
import { COLOR_RANGE_LABEL } from "@/shared/config/constants/color_prism";
import { CashItemEquipment } from "@/types/cashItem";

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
    <>
      <p className="text-sm">컬러링 프리즘이 적용된 아이템입니다.</p>
      <ul className="text-sm">
        <li>
          적용 범위{" "}
          <span
            className="text-[#FF7E54]"
            aria-label={`적용 범위: ${colorRangeLabel}`}
          >
            {colorRangeLabel}
          </span>
        </li>

        <li className="flex gap-4">
          <span>
            색조{" "}
            <span
              className="text-[#FF7E54]"
              aria-label={`색조 값: ${hue ?? 0}`}
            >
              {formatPrismValue(hue)}
            </span>
          </span>

          <span>
            채도{" "}
            <span
              className="text-[#FF7E54]"
              aria-label={`채도 값: ${saturation ?? 0}`}
            >
              {formatPrismValue(saturation)}
            </span>
          </span>

          <span>
            명도{" "}
            <span
              className="text-[#FF7E54]"
              aria-label={`명도 값: ${value ?? 0}`}
            >
              {formatPrismValue(value)}
            </span>
          </span>
        </li>
      </ul>
      <Separator className="my-2" role="separator" />
    </>
  );
};
