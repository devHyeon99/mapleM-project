// ItemCashPopover.tsx (최종 수정)

"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { CashItemEquipment } from "@/types/cashItem";
import { ItemCashIconBase } from "./ItemCashIconBase";
import { ItemCashInfo } from "./ItemCashInfo";
import { ItemCashOptions } from "./ItemCashOptions";
import { ItemCashColoringPrism } from "./ItemCashColoringPrism";
import { ItemCashDescription } from "./ItemCashDescription";
import { ItemCashPopoverHeader } from "./ItemCashPopoverHeader";

interface ItemCashPopoverProps {
  item: CashItemEquipment;
}

export const ItemCashPopover = ({ item }: ItemCashPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ItemCashIconBase item={item} />
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="center"
        className="popover-center bg-popover/98 relative w-72 rounded-lg border-2 p-4 font-medium shadow-lg"
      >
        <PopoverPrimitive.Close className="absolute top-2 right-2 opacity-70 hover:opacity-100">
          <X className="h-5 w-5" />
        </PopoverPrimitive.Close>

        {/* 캐시 아이템 헤더 */}
        <ItemCashPopoverHeader item={item} />

        {/* 캐시 아이템 정보 */}
        <ItemCashInfo item={item} />

        {/* 캐시 아이템 옵션 */}
        <ItemCashOptions options={item.cash_item_option} />

        {/* 캐시 컬러링 프리즘 */}
        <ItemCashColoringPrism coloringPrism={item.cash_item_coloring_prism} />

        {/* 캐시 아이템 설명 */}
        <ItemCashDescription description={item.cash_item_description} />
      </PopoverContent>
    </Popover>
  );
};
