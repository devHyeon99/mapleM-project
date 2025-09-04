import { CommonItemPopover } from "@/shared/ui/CommonItemPopover";
import { CharacterItemEquipment } from "@/entities/item";
import {
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

interface ItemPopoverProps {
  item: CharacterItemEquipment;
  className?: string;
}

export const ItemPopover = ({ item, className }: ItemPopoverProps) => {
  return (
    <CommonItemPopover
      trigger={<ItemIconBase item={item} className={className} />}
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
    </CommonItemPopover>
  );
};
