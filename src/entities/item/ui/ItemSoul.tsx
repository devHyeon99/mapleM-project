import { CharacterItemEquipment } from "../model/types";
import { splitOptionText } from "../lib";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemSoul = ({ item }: Props) => {
  if (!item.soul_info) {
    return null;
  }

  const options = splitOptionText(item.soul_info.soul_option);

  return (
    <div className="border-game-line text-body border-b py-1">
      <p>
        <span className="text-orange-400">{item.soul_info.soul_name}</span> 적용
      </p>
      <dl>
        {options.map((opt, idx) => (
          <ItemOptionRow key={idx} label={opt.name} value={opt.value} />
        ))}
      </dl>
    </div>
  );
};
