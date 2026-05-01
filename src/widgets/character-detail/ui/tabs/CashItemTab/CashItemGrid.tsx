import { ItemCashDialog } from "@/features/item-dialog";
import { SortedCashItemSlot } from "@/entities/cash-item/lib/sortCashItems";
import { ItemEmptySlot } from "@/shared/ui/ItemEmptySlot";

interface CashItemGridProps {
  items: SortedCashItemSlot[];
  presetNo?: number | null;
}

// 뷰포트가 아닌 컨테이너 폭을 7등분해서 좁은 화면에서도 남는 가로 공간을 모두 사용
const slotSizeClass = "w-full";

export const CashItemGrid = ({ items, presetNo }: CashItemGridProps) => {
  const hasNoEquipItems = items.every((slot) => slot.item === null);

  return (
    <div className="relative mx-auto w-full max-w-[28rem] px-1">
      <div
        className="grid w-full grid-cols-7 gap-1"
        aria-hidden={hasNoEquipItems}
      >
        {items.map((slot, idx) => {
          if (!slot.slotName) {
            return (
              <div
                key={`spacer-${idx}`}
                className={`aspect-square ${slotSizeClass}`}
                aria-hidden="true"
              />
            );
          }

          if (slot.item) {
            return (
              <div
                key={`${presetNo}-${slot.item.cash_item_name}-${idx}`}
                className={`aspect-square ${slotSizeClass}`}
              >
                <ItemCashDialog
                  item={slot.item}
                  className="h-full w-full cursor-pointer shadow-sm"
                />
              </div>
            );
          }

          return (
            <ItemEmptySlot
              key={`empty-${idx}`}
              label={slot.slotName}
              className={`aspect-square ${slotSizeClass}`}
            />
          );
        })}
      </div>

      {hasNoEquipItems && (
        <div className="bg-card/70 absolute inset-0 flex items-center justify-center text-center backdrop-blur-[2px]">
          <p className="text-muted-foreground text-sm font-bold">
            {presetNo}번 프리셋 정보가 없습니다.
          </p>
        </div>
      )}
    </div>
  );
};
