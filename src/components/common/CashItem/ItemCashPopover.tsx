"use client";

import Image from "next/image";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import { ItemCashIconBase } from "./ItemCashIconBase";
import { CashItemEquipment } from "@/types/cashItem";
import { Separator } from "@/components/ui/separator";

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
        className="popover-center bg-popover/98 relative w-72 rounded-lg border-2 p-4 shadow-lg"
      >
        <PopoverPrimitive.Close className="absolute top-2 right-2 opacity-70 hover:opacity-100">
          <X className="h-5 w-5" />
        </PopoverPrimitive.Close>

        <div className="flex items-center gap-2 border-b pb-3">
          <div className="relative flex h-11.5 w-11.5 items-center justify-center rounded-xs border border-gray-300 bg-white p-0">
            <Image
              src={item.cash_item_icon}
              alt={item.cash_item_name}
              width={32}
              height={32}
              unoptimized
              className="h-auto w-auto object-contain"
            />
          </div>
          <span className="self-start font-bold">{item.cash_item_name}</span>
        </div>

        {item.cash_item_description && (
          <p className="mt-2 text-sm whitespace-pre-line">
            {item.cash_item_description}
          </p>
        )}

        {item.cash_item_option?.length > 0 && (
          <>
            <Separator className="my-2" role="separator" />
            <p className="text-sm font-medium">아이템 옵션</p>
            <ul className="space-y-1 text-sm">
              {item.cash_item_option.map((opt, idx) => (
                <li key={idx} className="flex gap-1">
                  <span>{opt.option_name} :</span>
                  <span
                    className="font-semibold text-[#FF7E54]"
                    aria-label={`${opt.option_name} ${opt.option_value}`}
                  >
                    {opt.option_value ?? "-"}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {item.cash_item_coloring_prism && (
          <>
            <Separator className="my-2" role="separator" />
            <p className="text-sm font-medium">
              컬러링 프리즘이 적용된 아이템입니다.
            </p>
            <ul className="text-sm">
              <li>
                적용 범위:{" "}
                <span
                  className="font-semibold text-[#FF7E54]"
                  aria-label={`적용 범위: ${
                    item.cash_item_coloring_prism.color_range === "1"
                      ? "전체 계열"
                      : "특정 계열"
                  }`}
                >
                  {item.cash_item_coloring_prism.color_range === "1"
                    ? "전체 계열"
                    : "??"}
                </span>
              </li>

              {/* 색조/채도/명도 한 줄 */}
              <li className="flex gap-4">
                <span>
                  색조 :{" "}
                  <span
                    className="font-semibold text-[#FF7E54]"
                    aria-label={`색조 값: ${item.cash_item_coloring_prism.hue ?? 0}`}
                  >
                    {item.cash_item_coloring_prism.hue !== null
                      ? `${item.cash_item_coloring_prism.hue > 0 ? "+" : ""}${
                          item.cash_item_coloring_prism.hue
                        }`
                      : 0}
                  </span>
                </span>

                <span>
                  채도 :{" "}
                  <span
                    className="font-semibold text-[#FF7E54]"
                    aria-label={`채도 값: ${
                      item.cash_item_coloring_prism.saturation ?? 0
                    }`}
                  >
                    {item.cash_item_coloring_prism.saturation !== null
                      ? `${
                          item.cash_item_coloring_prism.saturation > 0
                            ? "+"
                            : ""
                        }${item.cash_item_coloring_prism.saturation}`
                      : 0}
                  </span>
                </span>

                <span>
                  명도 :{" "}
                  <span
                    className="font-semibold text-[#FF7E54]"
                    aria-label={`명도 값: ${item.cash_item_coloring_prism.value ?? 0}`}
                  >
                    {item.cash_item_coloring_prism.value !== null
                      ? `${item.cash_item_coloring_prism.value > 0 ? "+" : ""}${
                          item.cash_item_coloring_prism.value
                        }`
                      : 0}
                  </span>
                </span>
              </li>
            </ul>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
