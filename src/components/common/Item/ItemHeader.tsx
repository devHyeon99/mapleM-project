import { CharacterItemEquipment } from "@/types/character";
import { getGradeInfo } from "@/utils/getGradeInfo";
import { ItemIconBase } from "@/components/common/Item/ItemIconBase";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemHeader = ({ item }: Props) => {
  const grade = getGradeInfo(item.item_grade);

  return (
    <div className="flex items-center gap-2 border-b pb-3">
      <ItemIconBase
        item={item}
        size={46}
        className="pointer-events-none cursor-default"
      />

      {/* 아이템 이름 */}
      <span className={`self-start ${grade?.textColor}`}>{item.item_name}</span>
    </div>
  );
};
