import { ItemCashDialog } from "@/features/item-popover";
import { SortedCashItemSlot } from "@/entities/cash-item/lib/sortCashItems";
import { ItemEmptySlot } from "@/shared/ui/ItemEmptySlot";

interface CashItemGridProps {
  items: SortedCashItemSlot[];
  presetNo?: number | null;
}

export const CashItemGrid = ({ items, presetNo }: CashItemGridProps) => {
  const slotSizeClass = "w-[clamp(3rem,7vw,3.6875rem)]";

  const hasNoEquipItems = items.every((slot) => slot.item === null);

  return (
    <div className="relative mx-auto w-fit">
      <div className="grid w-fit grid-cols-7 gap-1" aria-hidden={hasNoEquipItems}>
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
                <ItemCashDialog item={slot.item} />
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
