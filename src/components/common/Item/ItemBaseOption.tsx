import { CharacterItemEquipment } from "@/types/character";
import { parseOptions } from "@/utils/parseOptions";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemBaseOption = ({ item }: Props) => {
  if (!item.item_option) return null;

  const options = parseOptions(item.item_option);

  return (
    <div className="border-b pb-2 text-sm">
      <p className="font-bold">기본 옵션</p>
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
