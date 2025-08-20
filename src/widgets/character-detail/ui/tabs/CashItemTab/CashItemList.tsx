import { SortedCashItemSlot } from "@/entities/cash-item/lib/sortCashItems";
import { cn } from "@/shared/lib/utils";
import { CashItemEmpty } from "./CashItemEmpty";
import { CashItemRow } from "./CashItemRow";

interface CashItemListProps {
  items: SortedCashItemSlot[];
  presetNo?: number | null;
  className?: string;
}

export const CashItemList = ({
  items,
  presetNo,
  className,
}: CashItemListProps) => {
  const hasNoEquipItems = items.every((slot) => slot.item === null);

  if (hasNoEquipItems) {
    return (
      <section className="grid min-h-78 place-content-center rounded-md border p-4 text-center">
        <p className="text-muted-foreground text-sm">
          {presetNo}번 프리셋 정보가 없습니다.
        </p>
      </section>
    );
  }

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {items.map((slot, index) => {
        // 아이템이 있는 경우
        if (slot.item) {
          return <CashItemRow key={`item-${index}`} item={slot.item} />;
        }

        // 슬롯 이름은 있는데 아이템이 없는 경우 (빈 장비칸)
        if (slot.slotName) {
          return <CashItemEmpty key={`empty-${index}`} label={slot.slotName} />;
        }

        // 단순 여백
        return null;
      })}
    </div>
  );
};
