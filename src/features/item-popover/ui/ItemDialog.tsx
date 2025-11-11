import {
  CharacterItemEquipment,
  ItemAdditionalOption,
  ItemAdditionalPotential,
  ItemBaseOption,
  ItemDescription,
  ItemEmblem,
  ItemHeader,
  ItemIconBase,
  ItemInfo,
  ItemPotential,
  ItemSoul,
  ItemStarforce,
} from "@/entities/item";
import { ItemDialogFrame } from "./ItemDialogFrame";

interface ItemDialogProps {
  item: CharacterItemEquipment;
  className?: string;
}

export const ItemDialog = ({ item, className }: ItemDialogProps) => {
  return (
    <ItemDialogFrame
      trigger={<ItemIconBase item={item} className={className} />}
      title={`${item.item_name} 상세 정보`}
    >
      <ItemHeader item={item} />
      <ItemStarforce item={item} />
      <ItemInfo item={item} />
      <ItemBaseOption item={item} />
      <ItemAdditionalOption item={item} />
      <ItemPotential item={item} />
      <ItemAdditionalPotential item={item} />
      <ItemSoul item={item} />
      <ItemEmblem item={item} />
      <ItemDescription item={item} />
    </ItemDialogFrame>
  );
};
