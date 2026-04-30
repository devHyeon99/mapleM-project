import type { SortedItemSlot } from "@/entities/item";
import { ItemDialog } from "@/features/item-popover";
import { ItemEmptySlot } from "@/shared/ui/ItemEmptySlot";

interface ItemGridProps {
  items: SortedItemSlot[];
  presetNo: number;
}

export const ItemGrid = ({ items, presetNo }: ItemGridProps) => {
  // 뷰포트가 아닌 컨테이너 폭을 7등분해서 좁은 화면에서도 남는 가로 공간을 모두 사용
  const slotSizeClass = "w-full";

  // 안드로이드와 하트를 제외한 순수 장비 아이템만 필터링해서 체크
  const hasNoEquipItems = items.every((slot) => {
    // 안드로이드나 하트 슬롯은 검사에서 제외 (무조건 true 반환해서 통과시킴)
    if (slot.slotName === "안드로이드" || slot.slotName === "하트") {
      return true;
    }
    // 나머지 슬롯은 item이 null이어야 함
    return slot.item === null;
  });

  return (
    <div className="relative mx-auto w-full max-w-[28rem] px-1">
      <div
        className="grid w-full grid-cols-7 gap-1"
        aria-hidden={hasNoEquipItems}
      >
        {items.map((slot, idx) => {
          // 빈 여백 (slotName이 빈 문자열 ""인 경우)
          if (!slot.slotName) {
            return (
              <div
                key={`spacer-${idx}`}
                className={`aspect-square ${slotSizeClass}`}
                aria-hidden="true"
              />
            );
          }

          // 아이템이 있는 경우
          if (slot.item) {
            return (
              <div
                key={`${presetNo}-${slot.item.item_name}-${idx}`}
                className={`aspect-square ${slotSizeClass}`}
              >
                <ItemDialog
                  item={slot.item}
                  className="h-full w-full cursor-pointer shadow-sm"
                />
              </div>
            );
          }

          // 아이템은 없지만 슬롯 이름이 있는 경우 (빈 장비칸)
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
