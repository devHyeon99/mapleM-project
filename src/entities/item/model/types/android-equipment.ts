import { ItemOption } from "./item-option";

// ==========================================================================
// 1. API Response 타입 (넥슨 API 응답 구조)
// ==========================================================================

/** 안드로이드 장비 조회 API 응답 (/character/android-equipment) */
export interface CharacterAndroidResponse {
  use_preset_no?: number;
  android_equipment: CharacterAndroidEquipment | null;
  heart_equipment: CharacterHeartEquipment | null;
  android_heart_equipment_preset?: AndroidHeartPreset[];
}

// ==========================================================================
// 2. 도메인 모델 (UI 및 로직에서 사용할 구조)
// ==========================================================================

export interface CashItemColoringPrism {
  color_range: string;
  hue: string;
  saturation: string;
  value: string;
}

/** 안드로이드가 착용한 캐시 아이템 */
export interface AndroidCashItemEquipment {
  cash_item_equipment_page_name: string;
  cash_item_equipment_slot_name: string;
  cash_item_name: string;
  cash_item_icon: string;
  cash_item_description: string;
  android_item_gender: string;
  cash_item_label: string;
  cash_item_coloring_prism?: CashItemColoringPrism | null;
}

/** 안드로이드 본체 정보 */
export interface CharacterAndroidEquipment {
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_grade: string;
  android_gender: string;
  android_non_humanoid_flag: string; // "0" or "1"
  android_warehouse_usable_flag: string; // "0" or "1"
  android_ear_sensor_clip_flag?: string; // "0" or "1"
  android_cash_item_equipment: AndroidCashItemEquipment[];
}

/** 기계 심장 정보 */
export interface CharacterHeartEquipment {
  heart_name: string;
  heart_icon: string;
  heart_description: string;
  item_additional_option_grade: string;
  item_potential_option_grade: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
}

/** 안드로이드 프리셋 구조 */
export interface AndroidHeartPreset {
  preset_no: number;
  android_equipment: CharacterAndroidEquipment | null;
  heart_equipment: CharacterHeartEquipment | null;
}
