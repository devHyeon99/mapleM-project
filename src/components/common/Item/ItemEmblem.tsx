import { CharacterItemEquipment } from "@/types/character";
import { parseOptions } from "@/utils/parseOptions";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemEmblem = ({ item }: Props) => {
  const emblem = item.emblem_info;
  if (!emblem) return null;

  const options = parseOptions(emblem.emblem_option);

  return (
    <div className="border-b pb-2 text-sm">
      <p className="text-[#b23400] dark:text-[#FF8939]">
        Lv.{emblem.emblem_level} {emblem.emblem_name}
      </p>
      <dl>
        {options.map((opt, idx) => (
          <div key={idx} className="flex gap-1">
            <dt>{opt.name}</dt>
            <dd>{opt.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
