import { ItemCashIconBase } from "./ItemCashIconBase";
import { CashItemEquipment } from "@/types/cashItem";

interface Props {
  item: Pick<CashItemEquipment, "cash_item_icon" | "cash_item_name">;
}

export const ItemCashPopoverHeader = ({ item }: Props) => {
  return (
    <div className="flex items-center gap-2 border-b pb-3">
      <ItemCashIconBase item={item} />
      <span className="self-start">{item.cash_item_name}</span>
    </div>
  );
};
