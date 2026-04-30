import { CharacterItemEquipment } from "../model/types";
import { ItemOptionSection } from "./ItemOptionSection";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemBaseOption = ({ item }: Props) => (
  <ItemOptionSection
    title="아이템 옵션"
    options={item.item_basic_option}
    labelClassName="text-[#a1a1a1]"
    valueClassName="text-orange-400"
  />
);
