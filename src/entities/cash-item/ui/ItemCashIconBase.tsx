import * as React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { CashItemEquipment } from "@/entities/cash-item";

interface ItemCashIconBaseProps {
  item: Pick<
    CashItemEquipment,
    | "cash_item_icon"
    | "cash_item_name"
    | "miracle_anvil_item_icon"
    | "miracle_anvil_item_name"
  >;
  className?: string;
}

export const ItemCashIconBase = React.forwardRef<
  HTMLDivElement,
  ItemCashIconBaseProps
>(({ item, className, ...props }, ref) => {
  const displayIcon =
    item.miracle_anvil_item_icon && item.miracle_anvil_item_icon.trim() !== ""
      ? item.miracle_anvil_item_icon
      : item.cash_item_icon;
  const displayName =
    item.miracle_anvil_item_name && item.miracle_anvil_item_name.trim() !== ""
      ? item.miracle_anvil_item_name
      : item.cash_item_name;

  const safeIcon =
    displayIcon && displayIcon.trim() !== "" && displayIcon !== "(Unknown)"
      ? displayIcon
      : "/images/item-placeholder.png";

  const safeName = displayName && displayName !== "(Unknown)" ? displayName : "아이템";

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
      <Image
        src={safeIcon}
        alt={safeName}
        width={1}
        height={1}
        loading="lazy"
        unoptimized
        className="max-h-full max-w-full object-contain"
        style={{ width: "auto", height: "auto", imageRendering: "pixelated" }}
      />
    </div>
  );
});

ItemCashIconBase.displayName = "ItemCashIconBase";
