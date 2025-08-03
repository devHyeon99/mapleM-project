import { cn } from "@/shared/lib/utils";
import { CashItemEquipment } from "../model";
import { forwardRef } from "react";

interface ItemCashIconBaseProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  item: Pick<CashItemEquipment, "cash_item_icon" | "cash_item_name">;
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.cash_item_icon}
        alt={item.cash_item_name}
        width={40}
        height={40}
        loading="lazy"
        className="h-auto w-auto"
      />
    </button>
  );
});

ItemCashIconBase.displayName = "ItemCashIconBase";
