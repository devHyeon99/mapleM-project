import { CharacterItemEquipment } from "@/entities/character";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemBaseOption = ({ item }: Props) => {
  if (!item.item_basic_option || item.item_basic_option.length === 0)
    return null;

  return (
    <div className="border-divider border-b py-1 text-sm">
      <dl>
        {item.item_basic_option.map((opt) => (
          <div
            key={opt.option_no}
            className="grid grid-cols-[max-content_1fr] gap-x-2"
          >
            <dt className="whitespace-nowrap">{opt.option_name}</dt>
            <dd className="text-right text-[#FF8939] tabular-nums">
              {opt.option_value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
