import { CashItemEquipment } from "@/entities/cash-item";
import { ItemCashDialog } from "@/features/item-popover";

interface CashItemListRowProps {
  item: CashItemEquipment;
  isLast?: boolean;
}

const getCashLabelStyle = (label: string | null) => {
  if (label === "마스터") return "text-indigo-600 dark:text-indigo-400";
  if (label === "스페셜") return "text-amber-600 dark:text-amber-400";
  if (label === "레드") return "text-red-600 dark:text-red-400";
  if (label === "블랙") return "text-zinc-700 dark:text-zinc-300";
  return "text-muted-foreground";
};

export const CashItemListRow = ({ item, isLast = false }: CashItemListRowProps) => {
  const optionSummary = item.cash_item_option
    .map((opt) => `${opt.option_name} ${opt.option_value}`)
    .join(", ");

  const infoSummary = [item.cash_item_equipment_page_name, item.cash_item_gender]
    .filter(Boolean)
    .join(" | ");

  return (
    <div
      className={[
        "bg-card hover:bg-accent/50 flex w-full items-center gap-3 p-4 transition-colors",
        isLast ? "" : "border-b",
      ].join(" ")}
    >
      <div className="h-12.5 w-12.5 shrink-0 self-start">
        <ItemCashDialog item={item} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
        <div className="mb-0.5 flex items-center justify-between gap-2">
          <span className="truncate text-base leading-none font-semibold">
            {item.cash_item_name}
          </span>
          {item.cash_item_label && (
            <span
              className={`shrink-0 text-xs font-semibold ${getCashLabelStyle(item.cash_item_label)}`}
            >
              {item.cash_item_label}
            </span>
          )}
        </div>

        {infoSummary && (
          <p className="text-muted-foreground truncate text-xs">{infoSummary}</p>
        )}

        {optionSummary && (
          <p className="text-muted-foreground truncate text-xs">
            <span className="inline-block min-w-[24px] font-semibold text-green-600 dark:text-green-400">
              옵션
            </span>
            <span className="text-foreground/70 font-medium">{optionSummary}</span>
          </p>
        )}
      </div>
    </div>
  );
};
