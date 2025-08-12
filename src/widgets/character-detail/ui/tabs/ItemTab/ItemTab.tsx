"use client";

import { CharacterDetailData } from "@/entities/character";
import { ItemIcon } from "@/entities/item";
import { sortItems } from "@/entities/item/lib";
import { SetEffectDialog } from "./SetEffectDialog";

interface ItemTabProps {
  data: CharacterDetailData;
}

export const ItemTab = ({ data }: ItemTabProps) => {
  const {
    item_equipment: items,
    android_equipment: android,
    heart_equipment: heart,
    set_effect: setEffect,
  } = data;

  // 데이터 유효성 검사 (items가 없으면 빈 배열 처리)
  const safeItems = items ?? [];
  const hasNoItems = safeItems.length === 0;

  // 아이템 정렬
  const sortedItems = sortItems(safeItems, android ?? null, heart ?? null);

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

      {/* 2. 세트 효과 버튼 영역 */}
      <SetEffectDialog setEffect={setEffect ?? []} />
    </div>
  );
};
