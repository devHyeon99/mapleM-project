import { CharacterItemEquipment } from "../model/types";

interface Props {
  item: CharacterItemEquipment;
}

/**
 * 문자열로 된 옵션을 "옵션명 / 값" 형태로 분리
 * 유일하게 엠블럼 아이템 옵션만 문자열로 데이터가 날라옴
 */
const parseOptions = (
  optionString: string,
): { name: string; value: string }[] => {
  if (!optionString) return [];

  return optionString
    .split(/,(?!\d{3}(?:\D|$))/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((opt) => {
      const match = opt.match(/^(.+?)\s([+-]?[\d,.]+%?)$/);
      if (!match) return { name: opt, value: "" };
      return { name: match[1], value: match[2] };
    });
};

export const ItemEmblem = ({ item }: Props) => {
  const emblem = item.emblem_info;
  if (!emblem) return null;

  const options = parseOptions(emblem.emblem_option);

  return (
    <div className="border-divider border-b py-1 text-sm">
      <p className="text-orange-400">
        Lv.{emblem.emblem_level} {emblem.emblem_name}
      </p>
      <dl>
        {options.map((opt, idx) => (
          <div key={idx} className="flex gap-1">
            <dt>{opt.name}</dt>
            <dd>{opt.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
