import { CharacterItemEquipment } from "../model/types";
import { splitOptionText } from "../lib";
import { ItemOptionRow } from "@/shared/ui/ItemOptionRow";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemEmblem = ({ item }: Props) => {
  const emblem = item.emblem_info;
  if (!emblem) return null;

  // 유일하게 엠블럼 옵션만 문자열로 옴
  const options = splitOptionText(emblem.emblem_option);

  return (
    <div className="border-game-line text-body border-b py-1">
      <p className="text-orange-400">
        Lv.{emblem.emblem_level} {emblem.emblem_name}
      </p>
      <dl>
        {options.map((opt, idx) => (
          <ItemOptionRow key={idx} label={opt.name} value={opt.value} />
        ))}
      </dl>
    </div>
  );
};
