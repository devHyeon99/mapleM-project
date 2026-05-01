import { CharacterItemEquipment } from "../model/types";
import { ItemOptionSection } from "./ItemOptionSection";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemBaseOption = ({ item }: Props) => (
  <ItemOptionSection
    title="아이템 옵션"
    options={item.item_basic_option}
    labelClassName="text-game-muted"
    valueClassName="text-orange-400"
  />
);
