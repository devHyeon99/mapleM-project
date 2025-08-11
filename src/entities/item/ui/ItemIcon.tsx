import { CharacterItemEquipment } from "@/entities/character";
import { ItemPopover } from "./ItemPopover";
import { ItemIconBase } from "./ItemIconBase";

interface ItemIconProps {
  item: CharacterItemEquipment;
}

export const ItemIcon = ({ item }: ItemIconProps) => {
  return (
    <ItemPopover item={item}>
      <ItemIconBase item={item} />
    </ItemPopover>
  );
};
