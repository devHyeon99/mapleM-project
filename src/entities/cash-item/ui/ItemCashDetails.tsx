import { CashItemEquipment } from "@/entities/cash-item";
import { ItemCashColoringPrism } from "./ItemCashColoringPrism";
import { ItemCashDescription } from "./ItemCashDescription";
import { ItemCashHeader } from "./ItemCashHeader";
import { ItemCashInfo } from "./ItemCashInfo";
import { ItemCashOptions } from "./ItemCashOptions";

interface ItemCashDetailsProps {
  item: CashItemEquipment;
}

/**
 * 캐시 아이템 상세에 들어가는 항목과 순서
 * 각 섹션은 표시할 값이 없으면 스스로 null을 반환한다.
 */
export const ItemCashDetails = ({ item }: ItemCashDetailsProps) => (
  <>
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
  </>
);
