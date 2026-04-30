import type { SortedItemSlot } from "@/entities/item";

import { ItemSetEffectCard } from "./ItemSetEffectCard";
import { ItemSpecSummaryCard } from "./ItemSpecSummaryCard";

interface ItemTabFooterProps {
  items: SortedItemSlot[];
  characterClass: string;
}

export const ItemTabFooter = ({
  items,
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
    <div className="grid w-full gap-2">
      <ItemSpecSummaryCard items={items} characterClass={characterClass} />
      <ItemSetEffectCard items={items} />
    </div>
  );
};
