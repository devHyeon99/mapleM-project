import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CharacterItemEquipment } from "@/entities/character";
import { X } from "lucide-react";
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

interface ItemPopoverProps {
  item: CharacterItemEquipment;
  className?: string;
}

export const ItemPopover = ({ item, className }: ItemPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ItemIconBase item={item} className={className} />
      </PopoverTrigger>

      <PopoverContent
        side="right"
        align="center"
        className="popover-center bg-popover/98 relative w-72 rounded-lg border-2 p-4 font-medium shadow-lg"
      >
        {/* 닫기 버튼 */}
        <PopoverPrimitive.Close className="absolute top-2 right-2 opacity-70 hover:opacity-100">
          <X className="size-5" />
        </PopoverPrimitive.Close>

        {/* 헤더 */}
        <ItemHeader item={item} />

        {/* 옵션들 */}
        <div className="space-y-2 pt-2">
          <ItemStarforce item={item} />
          <ItemInfo item={item} />
          <ItemBaseOption item={item} />
          <ItemAdditionalOption item={item} />
          <ItemPotential item={item} />
          <ItemAdditionalPotential item={item} />
          <ItemSoul item={item} />
          <ItemEmblem item={item} />
          <ItemDescription item={item} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
