import { ItemIcon, SortedItemSlot } from "@/entities/item";
import { cn } from "@/shared/lib/utils";
import { Fragment } from "react";

interface ItemGridProps {
  items: SortedItemSlot[];
  presetNo: number;
}

export const ItemGrid = ({ items, presetNo }: ItemGridProps) => {
  // 안드로이드와 하트를 제외한 순수 장비 아이템만 필터링해서 체크
  const hasNoEquipItems = items.every((slot) => {
    // 안드로이드나 하트 슬롯은 검사에서 제외 (무조건 true 반환해서 통과시킴)
    if (slot.slotName === "안드로이드" || slot.slotName === "하트") {
      return true;
    }
    // 나머지 슬롯은 item이 null이어야 함
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
    <div className="grid grid-cols-7 gap-x-1 gap-y-2">
      {items.map((slot, idx) => {
        // 빈 여백 (slotName이 빈 문자열 ""인 경우)
        if (!slot.slotName) {
          return (
            <div
              key={`spacer-${idx}`}
              className="aspect-square w-full"
              aria-hidden="true"
            />
          );
        }

        // 아이템이 있는 경우
        if (slot.item) {
          return (
            <Fragment key={`${presetNo}-${slot.item.item_name}-${idx}`}>
              <ItemIcon item={slot.item} />
            </Fragment>
          );
        }

        // 아이템은 없지만 슬롯 이름이 있는 경우 (빈 장비칸)
        return (
          <div
            key={`empty-slot-${idx}`}
            className={cn(
              "border-border bg-muted/20 flex aspect-square w-full items-center justify-center rounded-xs border-2 text-center",
            )}
            title={`${slot.slotName} 슬롯 (비어있음)`}
          >
            <span className="text-muted-foreground text-[10px] leading-tight font-semibold select-none sm:text-xs">
              {slot.slotName.replace(/\s*\(.*?\)/, "")}
            </span>
          </div>
        );
      })}
    </div>
  );
};
