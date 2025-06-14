import {
  CharacterItemEquipment,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
} from "@/types/character";
import {
  EQUIP_SLOT_ORDER_ONEPIECE,
  EQUIP_SLOT_ORDER_TOPBOTTOM,
} from "@/constants/item_slot";

export function sortItemsBySlot(
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
      item_icon: `https://open.api.nexon.com/static/maplestorym/asset/icon/${android.android_icon}`,
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

  const hasOnepiece = !!map["한벌옷"];
  const order = hasOnepiece
    ? EQUIP_SLOT_ORDER_ONEPIECE
    : EQUIP_SLOT_ORDER_TOPBOTTOM;

  return order.map((slot) => (slot ? (map[slot] ?? null) : null));
}
