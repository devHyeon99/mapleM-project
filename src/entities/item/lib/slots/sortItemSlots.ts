import {
  AndroidEquipment,
  CharacterItemEquipment,
  HeartEquipment,
  ItemDisplay,
} from "@/entities/item/model/types";
import {
  toAndroidDisplay,
  toEquipmentDisplay,
  toHeartDisplay,
} from "@/entities/item/model/mappers";
import {
  EQUIP_SLOT_ORDER_GRID_ONEPIECE,
  EQUIP_SLOT_ORDER_GRID_TOPBOTTOM,
  EQUIP_SLOT_ORDER_LIST_ONEPIECE,
  EQUIP_SLOT_ORDER_LIST_TOPBOTTOM,
} from "@/shared/config/constants/item_slot";

export interface SortedItemSlot {
  slotName: string;
  item: ItemDisplay | null;
}

// ============================================================================
// 공통 매핑 로직 (맵 생성 부분 분리)
// ============================================================================
function createItemMap(
  items: CharacterItemEquipment[],
  android: AndroidEquipment | null,
  heart: HeartEquipment | null,
) {
  const map: Record<string, ItemDisplay> = {};

  items.forEach((item) => {
    const displayItem = toEquipmentDisplay(item);
    map[displayItem.item_equipment_slot_name] = displayItem;
  });

  if (android) {
    const displayAndroid = toAndroidDisplay(android);
    map[displayAndroid.item_equipment_slot_name] = displayAndroid;
  }

  if (heart) {
    const displayHeart = toHeartDisplay(heart);
    map[displayHeart.item_equipment_slot_name] = displayHeart;
  }

  return map;
}

// ============================================================================
// 정렬 함수들
// ============================================================================

// 한벌옷 착용 여부에 따라 슬롯 순서를 고르고 그 순서대로 배치
function sortBySlotOrder(
  items: CharacterItemEquipment[],
  android: AndroidEquipment | null,
  heart: HeartEquipment | null,
  onepieceOrder: string[],
  topBottomOrder: string[],
): SortedItemSlot[] {
  const map = createItemMap(items, android, heart);
  const order = map["한벌옷"] ? onepieceOrder : topBottomOrder;

  return order.map((slotName) => ({
    slotName: slotName,
    item: map[slotName] ?? null,
  }));
}

// 그리드용 정렬 (빈 칸 포함)
export function sortItems(
  items: CharacterItemEquipment[],
  android: AndroidEquipment | null,
  heart: HeartEquipment | null,
): SortedItemSlot[] {
  return sortBySlotOrder(
    items,
    android,
    heart,
    EQUIP_SLOT_ORDER_GRID_ONEPIECE,
    EQUIP_SLOT_ORDER_GRID_TOPBOTTOM,
  );
}

// 리스트용 정렬 (빈 칸 없음, 순서 재배치)
export function sortItemsForList(
  items: CharacterItemEquipment[],
  android: AndroidEquipment | null,
  heart: HeartEquipment | null,
): SortedItemSlot[] {
  return sortBySlotOrder(
    items,
    android,
    heart,
    EQUIP_SLOT_ORDER_LIST_ONEPIECE,
    EQUIP_SLOT_ORDER_LIST_TOPBOTTOM,
  );
}
