import type { SortedItemSlot } from "@/entities/item/lib/slots/sortItemSlots";

import { ItemSetEffectCard } from "./ItemSetEffectCard";
import { ItemSpecSummaryCard } from "./ItemSpecSummaryCard";

interface ItemTabFooterProps {
  items: SortedItemSlot[];
  presetNo: number;
  characterClass: string;
}

export const ItemTabFooter = ({
  items,
  presetNo,
  characterClass,
}: ItemTabFooterProps) => {
  const hasNoEquipItems = items.every((slot) => {
    if (slot.slotName === "안드로이드" || slot.slotName === "하트") {
      return true;
    }
    return slot.item === null;
  });

  if (hasNoEquipItems) {
    return null;
  }

  return (
    <div className="grid w-full shadow-sm">
      <ItemSpecSummaryCard
        items={items}
        presetNo={presetNo}
        characterClass={characterClass}
      />
      <ItemSetEffectCard items={items} />
    </div>
  );
};
