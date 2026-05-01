import { CashItemEquipment } from "@/entities/cash-item";
import { ItemCashDetails } from "@/entities/cash-item/ui/ItemCashDetails";
import { ItemCashIconBase } from "@/entities/cash-item/ui/ItemCashIconBase";
import { ITEM_DIALOG_SKIN } from "./itemDialogSkin";
import { StickyFooterDialog } from "@/shared/ui/StickyFooterDialog";

interface ItemCashDialogProps {
  item: CashItemEquipment;
  className?: string;
}

export const ItemCashDialog = ({ item, className }: ItemCashDialogProps) => {
  const displayName =
    item.miracle_anvil_item_name && item.miracle_anvil_item_name.trim() !== ""
      ? item.miracle_anvil_item_name
      : item.cash_item_name;

  return (
    <StickyFooterDialog
      trigger={<ItemCashIconBase item={item} className={className} />}
      title={`${displayName} 상세 정보`}
      description={`${displayName} 아이템 상세 정보입니다.`}
      showScrollAffordance
      {...ITEM_DIALOG_SKIN}
    >
      <ItemCashDetails item={item} />
    </StickyFooterDialog>
  );
};
