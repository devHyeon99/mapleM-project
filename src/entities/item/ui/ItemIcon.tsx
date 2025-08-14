import { CharacterItemEquipment } from "@/entities/character";
import { ItemPopover } from "./ItemPopover";
import { ItemIconBase } from "./ItemIconBase";

interface ItemIconProps {
  item: CharacterItemEquipment;
  className?: string;
}

export const ItemIcon = ({ item, className }: ItemIconProps) => {
  return (
    <ItemPopover item={item}>
      {/* PopoverTrigger 역할을 하는 컴포넌트에 className 전달 */}
      <ItemIconBase item={item} className={className} />
    </ItemPopover>
  );
};
