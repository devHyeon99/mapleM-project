import { CharacterItemEquipment } from "../model/types";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";

interface Props {
  item: CharacterItemEquipment;
}

const MUTED_LABEL = "text-[#a1a1a1]";
const HIGHLIGHT_VALUE = "text-orange-400";

export const ItemInfo = ({ item }: Props) => {
  if (!item.equipment_level) return null;

  return (
    <div className="border-divider border-b py-1 text-sm">
      <p className="font-medium">아이템 정보</p>

      <dl className="flex flex-col">
        <ItemOptionRow
          label="착용레벨"
          value={item.equipment_level}
          labelClassName={MUTED_LABEL}
          valueClassName={HIGHLIGHT_VALUE}
        />
        <ItemOptionRow
          label="분류"
          value={item.item_equipment_page_name}
          labelClassName={MUTED_LABEL}
          valueClassName={HIGHLIGHT_VALUE}
        />
        {item.cuttable_count != null && (
          <ItemOptionRow
            label="남은 카르마 가위 횟수"
            value={item.cuttable_count}
            labelClassName={MUTED_LABEL}
            valueClassName={HIGHLIGHT_VALUE}
          />
        )}
      </dl>
    </div>
  );
};
