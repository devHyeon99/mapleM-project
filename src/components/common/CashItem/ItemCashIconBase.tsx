"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { CashItemEquipment } from "@/types/cashItem";
import { forwardRef } from "react";

interface ItemCashIconBaseProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  item: CashItemEquipment;
  size?: number;
}

export const ItemCashIconBase = forwardRef<
  HTMLButtonElement,
  ItemCashIconBaseProps
>(({ item, size = 46, className, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "relative flex cursor-pointer items-center justify-center rounded-xs border-2 border-[#9E9E9E] bg-white p-0",
        className,
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
      {...rest}
    >
      <Image
        src={item.cash_item_icon}
        alt={item.cash_item_name}
        width={size - 6}
        height={size - 6}
        unoptimized
        className="h-auto w-auto object-contain"
      />
    </button>
  );
});

ItemCashIconBase.displayName = "ItemCashIconBase";
