import { ItemCashIconBase } from "./ItemCashIconBase";
import { CashItemEquipment } from "@/entities/cash-item";

interface Props {
  item: Pick<
    CashItemEquipment,
    | "cash_item_icon"
    | "cash_item_name"
    | "miracle_anvil_item_icon"
    | "miracle_anvil_item_name"
  >;
}

export const ItemCashHeader = ({ item }: Props) => {
  return (
    <div className="border-divider flex items-center gap-2 border-b pb-2">
      <ItemCashIconBase
        item={item}
        className="pointer-events-none h-12.5 w-12.5 select-none"
      />
      <span className="self-start">{item.cash_item_name}</span>
    </div>
  );
};
