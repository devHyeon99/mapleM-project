"use client";

import {
  CharacterItemEquipment,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
  CharacterSetInfo,
} from "@/entities/character";
import { ItemIcon } from "@/entities/item";
import { sortItems } from "@/entities/item/lib";
import { SetEffectDialog } from "./SetEffectDialog"; // 분리한 컴포넌트 import

interface ItemTabProps {
  items: CharacterItemEquipment[];
  android: CharacterAndroidEquipment | null;
  heart: CharacterHeartEquipment | null;
  setEffect: CharacterSetInfo[] | null;
}

export const ItemTab = ({ items, android, heart, setEffect }: ItemTabProps) => {
  const hasNoItems = items.length === 0;

  // 아이템 정렬
  const sortedItems = sortItems(items, android, heart);

  return (
    <div className="flex flex-col gap-4">
      {/* 1. 아이템 그리드 영역 */}
      {hasNoItems ? (
        <section className="rounded-md border p-3">
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            2025.09.18 API 업데이트 이후 접속 하지 않았거나, 장착한 장비가
            없습니다.
          </p>
        </section>
      ) : (
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
      )}

      {/* 2. 세트 효과 버튼 영역 (분리된 컴포넌트 사용) */}
      <SetEffectDialog setEffect={setEffect} />
    </div>
  );
};
