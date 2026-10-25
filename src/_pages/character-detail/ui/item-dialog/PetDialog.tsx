import type { CharacterPet } from "@/entities/character";
import { formatDateTimeKST } from "@/shared/lib/date";
import { cn } from "@/shared/lib/utils";
import { ItemIconFrame } from "@/shared/ui/ItemIconFrame";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";
import { StickyFooterDialog } from "@/shared/ui/StickyFooterDialog";
import { ITEM_DIALOG_SKIN } from "./itemDialogSkin";

const MUTED_LABEL = "text-game-muted";
const HIGHLIGHT_VALUE = "text-orange-400";

/** API 펫 종류 코드의 한글 표기 */
const PET_TYPE_LABEL: Record<string, string> = {
  LunaPetit: "루나쁘띠",
};

interface PetDialogProps {
  pet: CharacterPet;
  className?: string;
}

export const PetDialog = ({ pet, className }: PetDialogProps) => {
  const iconClassName = "border-[#9E9E9E] bg-white";

  return (
    <StickyFooterDialog
      trigger={
        <ItemIconFrame
          icon={pet.icon}
          name={pet.name}
          className={cn(iconClassName, className)}
        />
      }
      title={`${pet.name} 상세 정보`}
      description={`${pet.name} 펫 상세 정보입니다.`}
      {...ITEM_DIALOG_SKIN}
    >
      <div className="border-game-line flex items-center gap-2 border-b pb-2">
        <ItemIconFrame
          icon={pet.icon}
          name={pet.name}
          className={cn(
            iconClassName,
            "pointer-events-none h-12.5 w-12.5 select-none",
          )}
        />
        <span className="self-start">{pet.name}</span>
      </div>

      <div className="border-game-line border-b py-1 text-sm">
        <p className="font-medium">펫 정보</p>
        <dl className="flex flex-col">
          <ItemOptionRow
            label="종류"
            value={
              (pet.pet_type &&
                (PET_TYPE_LABEL[pet.pet_type] ?? pet.pet_type)) ||
              "-"
            }
            labelClassName={MUTED_LABEL}
            valueClassName={HIGHLIGHT_VALUE}
          />
          <ItemOptionRow
            label="마법의 시간"
            value={
              (pet.date_expire && formatDateTimeKST(pet.date_expire)) || "-"
            }
            labelClassName={MUTED_LABEL}
            valueClassName={HIGHLIGHT_VALUE}
          />
        </dl>
      </div>
    </StickyFooterDialog>
  );
};
