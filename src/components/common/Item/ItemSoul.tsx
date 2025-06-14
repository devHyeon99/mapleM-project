import { CharacterItemEquipment } from "@/types/character";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemSoul = ({ item }: Props) => {
  if (!item.soul_info) {
    return null;
  }

  return (
    <div className="border-b pb-2 text-sm">
      <dl>
        <div>
          <dt className="sr-only">소울 이름</dt>
          <dd>
            <strong className="text-[#FF8939]">
              {item.soul_info.soul_name}
            </strong>
            <span aria-hidden="true"> 적용</span>
          </dd>
        </div>
        <div>
          <dt className="sr-only">소울 옵션</dt>
          <dd>{item.soul_info.soul_option}</dd>
        </div>
      </dl>
    </div>
  );
};
