import { ItemOption } from "./item-option";

/** 안드로이드 본체 정보 */
export interface AndroidEquipment {
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_grade: string;
  android_gender: string;
  android_non_humanoid_flag: string; // "0" or "1"
  android_warehouse_usable_flag: string; // "0" or "1"
  android_ear_sensor_clip_flag?: string; // "0" or "1"
}

/** 기계 심장 정보 */
export interface HeartEquipment {
  heart_name: string;
  heart_icon: string;
  heart_description: string;
  item_additional_option_grade: string;
  item_potential_option_grade: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
}

/** 안드로이드 프리셋 구조 */
export interface AndroidHeartEquipmentPreset {
  preset_no: number;
  android_equipment: AndroidEquipment | null;
  heart_equipment: HeartEquipment | null;
}
