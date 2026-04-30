import { CharacterItemEquipment } from "../model/types";
import { ItemOptionSection } from "./ItemOptionSection";

interface Props {
  item: CharacterItemEquipment;
}

export const ItemAdditionalPotential = ({ item }: Props) => (
  <ItemOptionSection
    title="에디셔널 잠재능력"
    options={item.item_additional_potential_option}
    grade={item.item_additional_potential_option_grade}
    withGradeBadge
  />
);
