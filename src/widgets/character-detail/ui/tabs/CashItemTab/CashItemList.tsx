import { SortedCashItemSlot } from "@/entities/cash-item/lib/sortCashItems";
import { cn } from "@/shared/lib/utils";
import { ItemEmptyRow } from "@/shared/ui/ItemEmptyRow";
import { CashItemListRow } from "./CashItemListRow";

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
  const lastItemIndex = items.reduce((lastIndex, slot, index) => {
    return slot.item ? index : lastIndex;
  }, -1);

  const hasNoEquipItems = items.every((slot) => slot.item === null);

  if (hasNoEquipItems) {
    return (
      <section className="grid min-h-78 place-content-center text-center">
        <p className="text-muted-foreground text-sm">
          {presetNo}번 프리셋 정보가 없습니다.
        </p>
      </section>
    );
  }

  return (
    <div className={cn("flex w-full flex-col pt-2", className)}>
      {items.map((slot, index) => {
        if (slot.item) {
          return (
            <CashItemListRow
              key={`item-${index}`}
              item={slot.item}
              isLast={index === lastItemIndex}
            />
          );
        }

        if (slot.slotName) {
          return <ItemEmptyRow key={`empty-${index}`} label={slot.slotName} />;
        }

        return null;
      })}
    </div>
  );
};
