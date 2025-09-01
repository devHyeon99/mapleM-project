import { ItemIconBase } from "./ItemIconBase";
import { ItemHeader } from "./ItemHeader";
import { ItemStarforce } from "./ItemStarforce";
import { ItemBaseOption } from "./ItemBaseOption";
import { ItemAdditionalOption } from "./ItemAdditionalOption";
import { ItemPotential } from "./ItemPotential";
import { ItemAdditionalPotential } from "./ItemAdditionalPotential";
import { ItemSoul } from "./ItemSoul";
import { ItemEmblem } from "./ItemEmblem";
import { ItemDescription } from "./ItemDescription";
import { ItemInfo } from "./ItemInfo";
import { CommonItemPopover } from "@/shared/ui/CommonItemPopover";
import { CharacterItemEquipment } from "@/entities/character/model/types/equipment";

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
