import { CharacterItemEquipment } from "../model/types";
import { ItemOptionSection } from "./ItemOptionSection";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemPotential = ({ item }: Props) => (
  <ItemOptionSection
    title="잠재능력"
    options={item.item_potential_option}
    grade={item.item_potential_option_grade}
    masteryPoint={item.mastery_info?.potential_option_point}
    withGradeBadge
  />
);
