import type { SortedItemSlot } from "@/entities/item";
import { MAGICAL_CLASSES } from "@/shared/config/constants/magic_class";
import { cn } from "@/shared/lib/utils";
import { ItemEmptyRow } from "../../ItemEmptyRow";
import { ItemListRow } from "./ItemListRow";

interface ItemListProps {
  items: SortedItemSlot[];
  presetNo: number;
  characterClass: string;
  hasNoEquipItems: boolean;
  className?: string;
}

export const ItemList = ({
  items,
  presetNo,
  characterClass,
  hasNoEquipItems,
  className,
}: ItemListProps) => {
  const isMagical = MAGICAL_CLASSES.includes(characterClass);
  const lastItemIndex = items.reduce((lastIndex, slot, index) => {
    return slot.item ? index : lastIndex;
  }, -1);

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
    <div className={cn("flex w-full flex-col", className)}>
      {items.map((slot, index) => {
        if (slot.item) {
          return (
            <ItemListRow
              key={`item-${index}`}
              item={slot.item}
              isLast={index === lastItemIndex}
              isMagical={isMagical}
            />
          );
        }

        if (!slot.slotName) {
          return null;
        }

        return <ItemEmptyRow key={`empty-${index}`} label={slot.slotName} />;
      })}
    </div>
  );
};
