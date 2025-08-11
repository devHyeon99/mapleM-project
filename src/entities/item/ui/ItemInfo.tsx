import { CharacterItemEquipment } from "@/entities/character";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemInfo = ({ item }: Props) => {
  if (!item.equipment_level) return null;

  return (
    <div className="border-b pb-2 text-sm">
      <p>아이템 정보</p>
      <dl>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <dt>착용레벨</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">
              {item.equipment_level}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt>분류</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">
              {item.item_equipment_page_name}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt>성별</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">
              {item.item_gender}
            </dd>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <dt>{item.transmission_able?.slice(0, 2)}</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">
              {item.transmission_able?.slice(2)}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt>{item.todd_able?.slice(0, 2)}</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">
              {item.todd_able?.slice(2)}
            </dd>
          </div>
          <div className="flex gap-1">
            <dt>남은 카르마 가위 횟수</dt>
            <dd className="text-[#b23400] dark:text-[#FF8939]">
              {item.cuttable_count}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
};
