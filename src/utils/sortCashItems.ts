import { CashItemEquipment } from "@/types/cashItem";
import {
  CASH_EQUIP_SLOT_ORDER_ONEPIECE,
  CASH_EQUIP_SLOT_ORDER_TOPBOTTOM,
} from "@/constants/cash_slot";

export function sortCashItemsBySlot(items: CashItemEquipment[]) {
  const map: Record<string, CashItemEquipment> = {};
  items.forEach((item) => {
    map[item.cash_item_equipment_slot_name] = item;
  });

  // 한벌옷 착용 여부 확인
  const hasOnepiece = !!map["한벌옷"];

  // 순서 배열 선택
  const order = hasOnepiece
    ? CASH_EQUIP_SLOT_ORDER_ONEPIECE
    : CASH_EQUIP_SLOT_ORDER_TOPBOTTOM;

  // 순서대로 정렬된 아이템 배열 반환
  return order.map((slot) => (slot ? (map[slot] ?? null) : null));
}
