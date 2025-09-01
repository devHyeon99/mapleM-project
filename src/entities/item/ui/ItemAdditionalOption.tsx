import { CharacterItemEquipment } from "@/entities/character";
import { getGradeInfo } from "../lib";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemAdditionalOption = ({ item }: Props) => {
  if (
    !Array.isArray(item.item_additional_option) ||
    item.item_additional_option.length === 0
  ) {
    return null;
  }

  const gradeInfo = getGradeInfo(item.item_additional_option_grade);

  return (
    <div className="border-divider border-b py-1 text-sm">
      <dl>
        {item.item_additional_option.map((opt) => (
          <div
            key={opt.option_no}
            className={`grid grid-cols-[max-content_1fr] gap-x-2 ${gradeInfo?.textColor}`}
          >
            <dt className="whitespace-nowrap">{opt.option_name}</dt>
            <dd className="text-right tabular-nums">{opt.option_value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
