import { CashItemEquipment } from "@/entities/cash-item";
import { CommonItemPopover } from "@/shared/ui/CommonItemPopover"; // ✅ 공통 컴포넌트 import

import { ItemCashIconBase } from "./ItemCashIconBase";
import { ItemCashInfo } from "./ItemCashInfo";
import { ItemCashOptions } from "./ItemCashOptions";
import { ItemCashColoringPrism } from "./ItemCashColoringPrism";
import { ItemCashDescription } from "./ItemCashDescription";
import { ItemCashPopoverHeader } from "./ItemCashPopoverHeader";

interface ItemCashPopoverProps {
  item: CashItemEquipment;
}

export const ItemCashPopover = ({ item }: ItemCashPopoverProps) => {
  return (
    <CommonItemPopover trigger={<ItemCashIconBase item={item} />}>
      <ItemCashPopoverHeader item={item} />
      <ItemCashInfo item={item} />
      <ItemCashOptions options={item.cash_item_option} />
      <ItemCashColoringPrism coloringPrism={item.cash_item_coloring_prism} />
      <ItemCashDescription description={item.cash_item_description} />
    </CommonItemPopover>
  );
};
