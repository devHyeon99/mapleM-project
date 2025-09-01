import { CharacterItemEquipment } from "@/entities/character";
import { getGradeInfo } from "../lib";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemPotential = ({ item }: Props) => {
  if (
    !Array.isArray(item.item_potential_option) ||
    item.item_potential_option.length === 0
  ) {
    return null;
  }

  const gradeInfo = getGradeInfo(item.item_potential_option_grade);

  return (
    <div className="border-divider border-b py-1 text-sm">
      <div className="flex items-center gap-1">
        <span
          className={`h-3.5 rounded-tl-xs rounded-br-xs px-1 text-[10px] font-bold text-white ${gradeInfo?.bgColor}`}
        >
          {gradeInfo?.label}
        </span>
        <p className={gradeInfo?.textColor}>잠재능력</p>
      </div>
      <dl>
        {item.item_potential_option.map((opt) => (
          <div
            key={opt.option_no}
            className="grid grid-cols-[max-content_1fr] gap-x-2"
          >
            <dt className="whitespace-nowrap">{opt.option_name}</dt>
            <dd className="text-right tabular-nums">{opt.option_value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
