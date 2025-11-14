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
  const displayName =
    item.miracle_anvil_item_name && item.miracle_anvil_item_name.trim() !== ""
      ? item.miracle_anvil_item_name
      : item.cash_item_name;

  return (
    <ItemDialogFrame
      trigger={<ItemCashIconBase item={item} />}
      title={`${displayName} 상세 정보`}
    >
      <ItemCashHeader item={item} />
      <ItemCashInfo item={item} />
      <ItemCashOptions
        options={item.cash_item_option}
        date={item.date_option_expire}
        miracleAnvilItemName={item.miracle_anvil_item_name}
        miracleAnvilItemIcon={item.miracle_anvil_item_icon}
      />
      <ItemCashColoringPrism coloringPrism={item.cash_item_coloring_prism} />
      <ItemCashDescription description={item.cash_item_description} />
    </ItemDialogFrame>
  );
};
