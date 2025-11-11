import { CashItemEquipment } from "@/entities/cash-item";
import { ItemCashColoringPrism } from "@/entities/cash-item/ui/ItemCashColoringPrism";
import { ItemCashDescription } from "@/entities/cash-item/ui/ItemCashDescription";
import { ItemCashHeader } from "@/entities/cash-item/ui/ItemCashHeader";
import { ItemCashIconBase } from "@/entities/cash-item/ui/ItemCashIconBase";
import { ItemCashInfo } from "@/entities/cash-item/ui/ItemCashInfo";
import { ItemCashOptions } from "@/entities/cash-item/ui/ItemCashOptions";
import { ItemDialogFrame } from "./ItemDialogFrame";

interface ItemCashDialogProps {
  item: CashItemEquipment;
}

export const ItemCashDialog = ({ item }: ItemCashDialogProps) => {
  return (
    <ItemDialogFrame
      trigger={<ItemCashIconBase item={item} />}
      title={`${item.cash_item_name} 상세 정보`}
    >
      <ItemCashHeader item={item} />
      <ItemCashInfo item={item} />
      <ItemCashOptions options={item.cash_item_option} />
      <ItemCashColoringPrism coloringPrism={item.cash_item_coloring_prism} />
      <ItemCashDescription description={item.cash_item_description} />
    </ItemDialogFrame>
  );
};
