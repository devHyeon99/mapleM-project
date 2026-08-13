import { CharacterItemEquipment } from "../model/types";
import { ItemOptionSection } from "./ItemOptionSection";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemAdditionalOption = ({ item }: Props) => (
  <ItemOptionSection
    title="추가 옵션"
    options={item.item_additional_option}
    grade={item.item_additional_option_grade}
    masteryPoint={item.mastery_info?.additional_option_point}
  />
);
