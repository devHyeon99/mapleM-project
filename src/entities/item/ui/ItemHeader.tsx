import { CharacterItemEquipment } from "../model/types";
import { getGradeInfo } from "../lib";
import { ItemIconBase } from "./ItemIconBase";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemHeader = ({ item }: Props) => {
  const grade = getGradeInfo(item.item_grade);

  // pr-8: 우상단 닫기(X) 버튼 아래로 이름이 파고들지 않도록 확보한 여백
  return (
    <div className="border-game-line flex items-center gap-2 border-b pr-8 pb-2">
      <ItemIconBase
        item={item}
        className="pointer-events-none h-14.5 w-14.5 select-none"
      />

      {/* 아이템 이름 */}
      <span className={`self-start break-keep ${grade?.textColor}`}>
        {item.item_name}
      </span>
    </div>
  );
};
