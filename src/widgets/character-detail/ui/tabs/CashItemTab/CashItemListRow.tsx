import type { CashItemEquipment } from "@/entities/cash-item/model/types/cashItem";
import { ItemCashDialog } from "@/features/item-dialog";
import { cn } from "@/shared/lib/utils";

interface CashItemListRowProps {
  item: CashItemEquipment;
  isLast?: boolean;
}

const CASH_LABEL_STYLE: Record<string, string> = {
  마스터: "text-indigo-600 dark:text-indigo-400",
  스페셜: "text-amber-600 dark:text-amber-400",
  레드: "text-red-600 dark:text-red-400",
  블랙: "text-zinc-700 dark:text-zinc-300",
};

const getCashLabelStyle = (label: string | null) =>
  (label && CASH_LABEL_STYLE[label]) || "text-muted-foreground";

export const CashItemListRow = ({
  item,
  isLast = false,
}: CashItemListRowProps) => {
  const displayName =
    item.miracle_anvil_item_name && item.miracle_anvil_item_name.trim() !== ""
      ? item.miracle_anvil_item_name
      : item.cash_item_name;

  return (
    <div
      className={cn(
        "bg-card hover:bg-accent/50 flex w-full items-center gap-3 p-4 transition-colors",
        !isLast && "border-b",
      )}
    >
      <div className="h-12.5 w-12.5 shrink-0 self-start">
        <ItemCashDialog item={item} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <span className="text-base font-semibold">{displayName}</span>
          {item.cash_item_label && (
            <span
              className={cn(
                "shrink-0 text-xs font-semibold",
                getCashLabelStyle(item.cash_item_label),
              )}
            >
              {item.cash_item_label} 라벨
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
