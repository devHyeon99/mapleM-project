import { CashItemEquipment } from "@/entities/cash-item";
import { ItemCashPopover } from "@/entities/cash-item"; // 아까 만든 팝오버
import { Badge } from "@/shared/ui/badge"; // Badge 컴포넌트가 없다면 div로 대체 가능

interface CashItemRowProps {
  item: CashItemEquipment;
}

export const CashItemRow = ({ item }: CashItemRowProps) => {
  // 옵션 요약 (공격력, 경험치 등)
  const optionSummary = item.cash_item_option
    .map((opt) => `${opt.option_name} ${opt.option_value}`)
    .join(", ");

  // 라벨 스타일링 (마스터/스페셜 등)
  const labelColor =
    item.cash_item_label === "마스터"
      ? "bg-indigo-500 text-white"
      : item.cash_item_label === "스페셜"
        ? "bg-amber-500 text-white"
        : item.cash_item_label === "레드"
          ? "bg-red-500 text-white"
          : item.cash_item_label === "블랙"
            ? "bg-neutral-800 text-white"
            : "bg-muted text-muted-foreground";

  return (
    <div className="bg-card hover:bg-accent/50 flex w-full items-center gap-3 rounded-md border-2 p-2 shadow-sm transition-colors">
      <div className="h-12.5 w-12.5 shrink-0">
        <ItemCashPopover item={item} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-base leading-none font-semibold">
            {item.cash_item_name}
          </span>
          {item.cash_item_label && (
            <Badge className={`${labelColor} shrink-0 px-1.5 py-0 text-xs`}>
              {item.cash_item_label} 라벨
            </Badge>
          )}
        </div>

        <div className="flex flex-row gap-2">
          {optionSummary ? (
            <p className="text-muted-foreground truncate text-xs">
              <span className="inline-block min-w-[24px] font-bold text-green-600 dark:text-green-400">
                옵션
              </span>
              <span className="text-foreground/80 font-semibold">
                {optionSummary}
              </span>
            </p>
          ) : (
            <p className="text-muted-foreground text-xs"></p>
          )}
        </div>
      </div>
    </div>
  );
};
