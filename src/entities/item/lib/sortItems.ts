import {
  CharacterItemEquipment,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
} from "@/entities/item/model/types";
import {
  EQUIP_SLOT_ORDER_GRID_ONEPIECE,
  EQUIP_SLOT_ORDER_GRID_TOPBOTTOM,
  EQUIP_SLOT_ORDER_LIST_ONEPIECE,
  EQUIP_SLOT_ORDER_LIST_TOPBOTTOM,
} from "@/shared/config/constants/item_slot";

export interface SortedItemSlot {
  slotName: string;
  item: CharacterItemEquipment | null;
}

// ============================================================================
// 공통 매핑 로직 (맵 생성 부분 분리)
// ============================================================================
function createItemMap(
  items: CharacterItemEquipment[],
  android: CharacterAndroidEquipment | null,
  heart: CharacterHeartEquipment | null,
) {
  const map: Record<string, CharacterItemEquipment> = {};
  const HEART_GRADE_MAP: Record<string, string> = {
    "실버 하트": "1",
    "골드 하트": "2",
    "티타늄 하트": "3",
  };

  items.forEach((item) => {
    map[item.item_equipment_slot_name] = item;
  });

  if (android) {
    map["안드로이드"] = {
      item_name: android.android_name,
      item_icon: android.android_icon,
      item_grade: android.android_grade,
      item_equipment_slot_name: "안드로이드",
      starforce_upgrade: null,
      item_potential_option_grade: null,
      item_additional_potential_option_grade: null,
      item_description: android.android_description,
    } as CharacterItemEquipment;
  }

  if (heart) {
    map["하트"] = {
      item_name: heart.heart_name,
      item_icon: heart.heart_icon,
      item_grade: HEART_GRADE_MAP[heart.heart_name] ?? "0",
      item_equipment_slot_name: "하트",
      starforce_upgrade: null,
      item_potential_option_grade: heart.item_potential_option_grade,
      item_additional_option_grade: heart.item_additional_option_grade,
      item_additional_option: heart.item_additional_option,
      item_potential_option: heart.item_potential_option,
    } as CharacterItemEquipment;
  }

  return map;
}

// ============================================================================
// 정렬 함수들
// ============================================================================

// 그리드용 정렬 (빈 칸 포함)
export function sortItems(
  items: CharacterItemEquipment[],
  android: CharacterAndroidEquipment | null,
  heart: CharacterHeartEquipment | null,
): SortedItemSlot[] {
  const map = createItemMap(items, android, heart);
  const hasOnepiece = !!map["한벌옷"];

  // 그리드용 순서 사용
  const order = hasOnepiece
    ? EQUIP_SLOT_ORDER_GRID_ONEPIECE
    : EQUIP_SLOT_ORDER_GRID_TOPBOTTOM;

  return order.map((slotName) => ({
    slotName: slotName,
    item: map[slotName] ?? null,
  }));
}

// 리스트용 정렬 (빈 칸 없음, 순서 재배치)
export function sortItemsForList(
  items: CharacterItemEquipment[],
  android: CharacterAndroidEquipment | null,
  heart: CharacterHeartEquipment | null,
): SortedItemSlot[] {
  const map = createItemMap(items, android, heart);
  const hasOnepiece = !!map["한벌옷"];

  // 리스트용 순서 사용
  const order = hasOnepiece
    ? EQUIP_SLOT_ORDER_LIST_ONEPIECE
    : EQUIP_SLOT_ORDER_LIST_TOPBOTTOM;

  return order.map((slotName) => ({
    slotName: slotName,
    item: map[slotName] ?? null,
  }));
}
