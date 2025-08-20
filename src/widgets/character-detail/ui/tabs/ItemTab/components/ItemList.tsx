import { SortedItemSlot } from "@/entities/item";
import { MAGICAL_CLASSES } from "@/shared/config/constants/magic_class";
import { cn } from "@/shared/lib/utils";
import { ItemEmptyRow } from "@/shared/ui/ItemEmptyRow";
import { ItemRow } from "./ItemListRow";

interface ItemListProps {
  items: SortedItemSlot[];
  presetNo: number;
  characterClass: string;
  className?: string;
}

export const ItemList = ({
  items,
  presetNo,
  characterClass,
  className,
}: ItemListProps) => {
  const isMagical = MAGICAL_CLASSES.includes(characterClass);
  const mainDamageType = isMagical ? "마법 대미지" : "물리 대미지";
  const mainAtkType = isMagical ? "마법 공격력" : "물리 공격력";

  const hasNoEquipItems = items.every((slot) => {
    if (slot.slotName === "안드로이드" || slot.slotName === "하트") {
      return true;
    }
    return slot.item === null;
  });

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
      <span className="text-muted-foreground text-right text-sm font-medium">
        잠재는 에디 잠재까지 포함한 합산 수치입니다.
      </span>
      {items.map((slot, index) => {
        if (slot.item) {
          return (
            <ItemRow
              key={`item-${index}`}
              item={slot.item}
              mainDamageType={mainDamageType}
              mainAtkType={mainAtkType}
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
