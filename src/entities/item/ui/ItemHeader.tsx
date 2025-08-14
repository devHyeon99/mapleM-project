import { CharacterItemEquipment } from "@/entities/character";
import { getGradeInfo } from "../lib";
import { ItemIconBase } from "./ItemIconBase";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemHeader = ({ item }: Props) => {
  const grade = getGradeInfo(item.item_grade);

  return (
    <div className="flex items-center gap-2 border-b pb-3">
      <ItemIconBase
        item={item}
        className="pointer-events-none h-12.5 w-12.5 cursor-default"
      />

      {/* 아이템 이름 */}
      <span className={`self-start ${grade?.textColor}`}>{item.item_name}</span>
    </div>
  );
};
