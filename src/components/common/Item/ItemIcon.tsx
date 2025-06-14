"use client";

import { CharacterItemEquipment } from "@/types/character";
import { ItemPopover } from "@/components/common/Item/ItemPopover";
import { ItemIconBase } from "@/components/common/Item/ItemIconBase";

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
