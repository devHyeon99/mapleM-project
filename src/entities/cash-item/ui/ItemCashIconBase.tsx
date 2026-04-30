import * as React from "react";
import { cn } from "@/shared/lib/utils";
import { CashItemEquipment } from "@/entities/cash-item";
import { ItemIconFrame } from "@/shared/ui/ItemIconFrame";

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
  // 신비의 모루로 외형이 합성된 경우 합성된 아이템으로 표시
  const displayIcon =
    item.miracle_anvil_item_icon && item.miracle_anvil_item_icon.trim() !== ""
      ? item.miracle_anvil_item_icon
      : item.cash_item_icon;
  const displayName =
    item.miracle_anvil_item_name && item.miracle_anvil_item_name.trim() !== ""
      ? item.miracle_anvil_item_name
      : item.cash_item_name;

  return (
    <ItemIconFrame
      ref={ref}
      {...props}
      icon={displayIcon}
      name={displayName}
      className={cn("border-[#9E9E9E] bg-white", className)}
    />
  );
});

ItemCashIconBase.displayName = "ItemCashIconBase";
