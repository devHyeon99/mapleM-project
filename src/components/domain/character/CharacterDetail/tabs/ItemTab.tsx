"use client";
import {
  CharacterItemEquipment,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
} from "@/types/character";
import { ItemIcon } from "@/components/common/Item/ItemIcon";
import { sortItemsBySlot } from "@/utils/sortItems";

interface ItemTabProps {
  items: CharacterItemEquipment[];
  android: CharacterAndroidEquipment | null;
  heart: CharacterHeartEquipment | null;
}

export const ItemTab = ({ items, android, heart }: ItemTabProps) => {
  if (items.length === 0) {
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, 장착한 장비가
          없습니다.
        </p>
      </section>
    );
  }
  const sortedItems = sortItemsBySlot(items, android, heart);

  return (
    <div className="relative grid grid-cols-7 gap-1">
      {sortedItems.map((item, idx) =>
        item ? (
          <ItemIcon
            key={`${item.item_name}-${item.item_equipment_slot_name}-${idx}`}
            item={item}
          />
        ) : (
          <div key={idx} className="h-[46px] w-[46px]" />
        ),
      )}
    </div>
  );
};
