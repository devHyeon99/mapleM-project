// ----------------------
// 잠재 능력 옵션
// ----------------------
export interface ItemOption {
  option_no: number;
  option_name: string | null;
  option_value: string | null;
}

// ----------------------
// 문장 옵션
// ----------------------
export interface EmblemInfo {
  emblem_name: string;
  emblem_level: number;
  emblem_option: string;
}

// ----------------------
// 장비 정보
// ----------------------
export interface CharacterItemEquipment {
  item_name: string;
  item_equipment_page_name: string;
  item_equipment_slot_name: string;
  item_grade: string;
  item_combat_power?: number;
  starforce_upgrade?: string | null;
  starforce_remain_count?: number;
  equipment_level?: number;
  item_gender?: string;
  cuttable_count?: number;
  transmission_able?: string;
  todd_able?: string;
  item_additional_option_grade?: string | null;
  item_potential_option_grade?: string | null;
  item_additional_potential_option_grade?: string | null;
  item_icon: string;
  item_option?: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
  item_additional_potential_option: ItemOption[];
  soul_equipment_flag?: string;
  soul_info?: {
    soul_name: string;
    soul_option: string;
  } | null;
  emblem_info?: EmblemInfo | null;
  item_description?: string;
}

// ----------------------
// 안드로이드 장비 정보
// ----------------------
export interface CharacterAndroidEquipment {
  android_name: string;
  android_icon: string;
  android_description: string;
  android_grade: string;
  android_gender: string;
  android_non_humanoid_flag: string; // "0" or "1"
  android_warehouse_usable_flag: string; // "0" or "1"
  android_cash_item_equipment: CharacterItemEquipment[];
}

// ----------------------
// 하트 장비 정보
// ----------------------
export interface CharacterHeartEquipment {
  heart_name: string;
  heart_icon: string;
  heart_description: string;
  item_additional_option_grade: string;
  item_potential_option_grade: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
}
