import { CharacterItemEquipment } from "@/shared/model/types/nexon-models";
import { parseOptions } from "../lib";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemBaseOption = ({ item }: Props) => {
  if (!item.item_option) return null;

  const options = parseOptions(item.item_option);

  return (
    <div className="border-b pb-2 text-sm">
      <p>기본 옵션</p>
      <dl>
        {options.map((opt, idx) => (
          <div key={idx} className="flex gap-1">
            <dt>{opt.name}</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">{opt.value}</dd>
          </div>
        ))}
        {/* <div className="flex gap-1">
          <dt>아이템 전투력</dt>
          <dd className="text-[#FF8939]">
            {item.item_combat_power?.toLocaleString() ?? 0}
          </dd>
        </div> */}
      </dl>
    </div>
  );
};
