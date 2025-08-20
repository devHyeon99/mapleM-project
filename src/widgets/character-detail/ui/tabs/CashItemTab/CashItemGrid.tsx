import { Fragment } from "react";
import { ItemCashPopover } from "@/entities/cash-item";
import { SortedCashItemSlot } from "@/entities/cash-item/lib/sortCashItems";
import { ItemEmptySlot } from "@/shared/ui/ItemEmptySlot";

interface CashItemGridProps {
  items: SortedCashItemSlot[];
  presetNo?: number | null;
}

export const CashItemGrid = ({ items, presetNo }: CashItemGridProps) => {
  // 아이템이 하나도 없는지 체크 (item이 전부 null인지)
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
    <div className="grid grid-cols-7 gap-x-1 gap-y-2">
      {items.map((slot, idx) => {
        // 아이템이 있는 경우 -> 팝오버 렌더링
        if (slot.item) {
          return (
            <Fragment key={`${presetNo}-${slot.item.cash_item_name}-${idx}`}>
              <ItemCashPopover item={slot.item} />
            </Fragment>
          );
        }

        // 아이템은 없지만 슬롯 이름이 있는 경우 -> 빈 칸 표시
        if (slot.slotName) {
          return <ItemEmptySlot key={`empty-${idx}`} label={slot.slotName} />;
        }

        // 슬롯 이름도 없는 경우 ("") -> 단순 여백
        return (
          <div
            key={`spacer-${idx}`}
            className="aspect-square w-full"
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
};
