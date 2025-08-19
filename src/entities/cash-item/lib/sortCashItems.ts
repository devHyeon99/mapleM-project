import { CashItemEquipment } from "../model/types";
import {
  CASH_EQUIP_SLOT_ORDER_ONEPIECE,
  CASH_EQUIP_SLOT_ORDER_TOPBOTTOM,
} from "@/shared/config/constants/cash_slot";

// 컴포넌트에서 사용할 데이터 구조 정의
export interface SortedCashItemSlot {
  slotName: string; // "무기", "모자" 또는 "" (공백)
  item: CashItemEquipment | null; // 실제 아이템 데이터 또는 null
}

export function sortCashItems(
  items: CashItemEquipment[],
): SortedCashItemSlot[] {
  // 아이템 매핑 (슬롯명 -> 객체)
  const map: Record<string, CashItemEquipment> = {};
  items.forEach((item) => {
    if (item.cash_item_equipment_slot_name) {
      map[item.cash_item_equipment_slot_name] = item;
    }
  });

  // 한벌옷 착용 여부 체크
  const hasOnepiece = !!map["한벌옷"];

  // 순서 배열 선택
  const order = hasOnepiece
    ? CASH_EQUIP_SLOT_ORDER_ONEPIECE
    : CASH_EQUIP_SLOT_ORDER_TOPBOTTOM;

  // 데이터 구조화하여 반환
  return order.map((slotName) => ({
    slotName, // 순서 배열에 있는 이름 그대로 전달
    item: slotName ? (map[slotName] ?? null) : null, // 이름이 있으면 아이템 찾기, 없으면("" spacer) null
  }));
}
