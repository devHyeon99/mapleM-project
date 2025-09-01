import { CharacterItemEquipment } from "@/entities/character";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemInfo = ({ item }: Props) => {
  if (!item.equipment_level) return null;

  return (
    <div className="border-divider border-b py-1 text-sm">
      <p className="font-medium">아이템 정보</p>

      <dl className="flex flex-col">
        {/* 착용레벨 */}
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">착용레벨</dt>
          <dd className="text-right text-[#a1a1a1] tabular-nums">
            {item.equipment_level}
          </dd>
        </div>

        {/* 분류 */}
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">분류</dt>
          <dd className="text-right text-[#a1a1a1]">
            {item.item_equipment_page_name}
          </dd>
        </div>

        {/* 카르마 가위 */}
        <div className="grid grid-cols-[max-content_1fr] gap-x-2">
          <dt className="whitespace-nowrap text-[#a1a1a1]">
            남은 카르마 가위 횟수
          </dt>
          <dd className="text-right text-[#a1a1a1] tabular-nums">
            {item.cuttable_count}
          </dd>
        </div>
      </dl>
    </div>
  );
};
