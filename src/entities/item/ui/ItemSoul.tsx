import { CharacterItemEquipment } from "@/entities/item";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemSoul = ({ item }: Props) => {
  if (!item.soul_info) {
    return null;
  }

  return (
    <div className="border-divider border-b py-1 text-sm">
      <dl>
        <div>
          <dt className="sr-only">소울 이름</dt>
          <dd>
            <span className="text-[#FF8939]">{item.soul_info.soul_name}</span>
            <span aria-hidden="true"> 적용</span>
          </dd>
        </div>
        <div>
          <dt className="sr-only">소울 옵션</dt>
          <dd className="">{item.soul_info.soul_option}</dd>
        </div>
      </dl>
    </div>
  );
};
