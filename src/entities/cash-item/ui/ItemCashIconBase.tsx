import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { CashItemEquipment } from "@/entities/cash-item";

interface ItemCashIconBaseProps {
  item: Pick<CashItemEquipment, "cash_item_icon" | "cash_item_name">;
  className?: string;
}

export const ItemCashIconBase = React.forwardRef<
  HTMLDivElement,
  ItemCashIconBaseProps
>(({ item, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        "@container",
        "relative flex aspect-square h-full w-full cursor-pointer items-center justify-center rounded-xs border-2",
        "border-[#9E9E9E] bg-white",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.cash_item_icon}
        alt={item.cash_item_name}
        loading="lazy"
        className="object-contain"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
});

ItemCashIconBase.displayName = "ItemCashIconBase";
