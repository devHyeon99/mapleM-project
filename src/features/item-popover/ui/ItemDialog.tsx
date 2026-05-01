import {
  CharacterItemEquipment,
  ItemDetails,
  ItemIconBase,
} from "@/entities/item";
import { ITEM_DIALOG_SKIN } from "./itemDialogSkin";
import { StickyFooterDialog } from "@/shared/ui/StickyFooterDialog";

interface ItemDialogProps {
  item: CharacterItemEquipment;
  className?: string;
}

export const ItemDialog = ({ item, className }: ItemDialogProps) => {
  return (
    <StickyFooterDialog
      trigger={<ItemIconBase item={item} className={className} />}
      title={`${item.item_name} 상세 정보`}
      description={`${item.item_name} 아이템 상세 정보입니다.`}
      showScrollAffordance
      {...ITEM_DIALOG_SKIN}
    >
      <ItemDetails item={item} />
    </StickyFooterDialog>
  );
};
