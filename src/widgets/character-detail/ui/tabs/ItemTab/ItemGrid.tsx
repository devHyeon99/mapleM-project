import type { CharacterPet } from "@/entities/character";
import type { SortedItemSlot } from "@/entities/item";
import { ItemDialog, PetDialog } from "@/features/item-dialog";
import { ItemEmptySlot } from "@/shared/ui/ItemEmptySlot";

interface ItemGridProps {
  items: SortedItemSlot[];
  presetNo: number;
  pets?: (CharacterPet | null)[];
  hasNoEquipItems: boolean;
}

// 펫은 마지막 줄(안드로이드·하트 줄) 5~7열에 명시 배치함
const PET_COLUMN_CLASSES = ["col-start-5", "col-start-6", "col-start-7"];

export const ItemGrid = ({
  items,
  presetNo,
  pets = [],
  hasNoEquipItems,
}: ItemGridProps) => {
  // 뷰포트가 아닌 컨테이너 폭을 7등분해서 좁은 화면에서도 남는 가로 공간을 모두 사용
  const slotSizeClass = "w-full";

  return (
    <div className="wide:mx-0 wide:w-[28rem] wide:px-0 wide:py-0 relative mx-auto flex w-full max-w-[28rem] flex-col items-center px-1 py-4">
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

        {PET_COLUMN_CLASSES.map((columnClass, idx) => {
          const pet = pets[idx];
          const className = `row-start-6 ${columnClass} aspect-square ${slotSizeClass}`;

          if (!pet) {
            return (
              <ItemEmptySlot
                key={`pet-${idx}`}
                label={`펫${idx + 1}`}
                className={className}
              />
            );
          }

          return (
            <div key={`pet-${idx}`} className={className}>
              <PetDialog
                pet={pet}
                className="h-full w-full cursor-pointer shadow-sm"
              />
            </div>
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
