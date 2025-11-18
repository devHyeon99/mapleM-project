import {
  AndroidEquipment,
  HeartEquipment,
  CharacterItemEquipment,
  ItemDisplay,
} from "../types";

const HEART_GRADE_MAP: Record<string, string> = {
  "실버 하트": "1",
  "골드 하트": "2",
  "티타늄 하트": "3",
};

export function toEquipmentDisplay(item: CharacterItemEquipment): ItemDisplay {
  return {
    ...item,
    source: "equipment",
  };
}

export function toAndroidDisplay(android: AndroidEquipment): ItemDisplay {
  return {
    source: "android",
    item_name: android.android_name,
    item_equipment_page_name: "안드로이드",
    item_icon: android.android_icon,
    item_grade: android.android_grade,
    item_equipment_slot_name: "안드로이드",
    item_basic_option: [],
    item_additional_option: [],
    item_potential_option: [],
    item_additional_potential_option: [],
    starforce_upgrade: null,
    item_potential_option_grade: null,
    item_additional_potential_option_grade: null,
    item_description: android.android_description,
  };
}

export function toHeartDisplay(heart: HeartEquipment): ItemDisplay {
  return {
    source: "heart",
    item_name: heart.heart_name,
    item_equipment_page_name: "하트",
    item_icon: heart.heart_icon,
    item_grade: HEART_GRADE_MAP[heart.heart_name] ?? "0",
    item_equipment_slot_name: "하트",
    item_basic_option: [],
    starforce_upgrade: null,
    item_potential_option_grade: heart.item_potential_option_grade,
    item_additional_option_grade: heart.item_additional_option_grade,
    item_additional_option: heart.item_additional_option,
    item_potential_option: heart.item_potential_option,
    item_additional_potential_option: [],
  };
}
