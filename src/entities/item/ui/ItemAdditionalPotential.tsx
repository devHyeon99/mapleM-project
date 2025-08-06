import { CharacterItemEquipment } from "@/shared/model/types/nexon-models";
import { getGradeInfo } from "../lib";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemAdditionalPotential = ({ item }: Props) => {
  if (
    !Array.isArray(item.item_additional_potential_option) ||
    item.item_additional_potential_option.length === 0
  ) {
    return null;
  }

  const gradeInfo = getGradeInfo(item.item_additional_potential_option_grade);

  return (
    <div className="border-b pb-2 text-sm">
      <p className={gradeInfo?.textColor}>
        {gradeInfo
          ? `[${gradeInfo.label}] 에디셔널 잠재능력`
          : "에디셔널 잠재능력"}
      </p>
      <dl>
        {item.item_additional_potential_option.map((opt) => (
          <div key={opt.option_no} className="flex gap-1">
            <dt>{opt.option_name}</dt>
            <dd>{opt.option_value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
