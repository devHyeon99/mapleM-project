import { CharacterItemEquipment } from "@/types/character";
import { getGradeInfo } from "@/utils/getGradeInfo";

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
    <div className="border-b pb-2 text-sm">
      <p className="font-bold">추가 옵션</p>
      <dl>
        {item.item_additional_option.map((opt) => (
          <div key={opt.option_no} className={gradeInfo?.textColor}>
            <dt className="inline">{opt.option_name}</dt>{" "}
            <dd className="inline">{opt.option_value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
