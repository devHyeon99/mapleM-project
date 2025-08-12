// ==========================================================================
// 1. 공통 하위 객체 (옵션, 소울, 엠블렘, 컬러링 프리즘)
// ==========================================================================

export interface ItemOption {
  option_no: number;
  option_name: string | null;
  option_value: string | null;
}

export interface SoulInfo {
  soul_name: string;
  soul_option: string;
  description?: string;
}

export interface EmblemInfo {
  emblem_name: string;
  emblem_level: number;
  emblem_option: string;
  description?: string;
}

// 안드로이드 캐시 아이템 전용 - 컬러링 프리즘
export interface CashItemColoringPrism {
  color_range: string;
  hue: string;
  saturation: string;
  value: string;
}

// ==========================================================================
// 2. 장비 아이템 상세 구조
// ==========================================================================
export interface CharacterItemEquipment {
  item_name: string;
  item_equipment_page_name: string;
  item_equipment_slot_name: string;
  item_grade: string;
  item_icon: string;
  item_description?: string;

  // 수치 정보
  item_combat_power?: number;
  equipment_level?: number;
  starforce_upgrade?: string | null;
  starforce_remain_count?: number;
  cuttable_count?: number;

  // 속성 정보
  item_gender?: string;
  transmission_able?: string;
  todd_able?: string;

  // 등급 정보
  item_additional_option_grade?: string | null;
  item_potential_option_grade?: string | null;
  item_additional_potential_option_grade?: string | null;

  // 옵션 리스트
  item_option?: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
  item_additional_potential_option: ItemOption[];

  // 소울 & 엠블렘
  soul_equipment_flag?: string;
  soul_info?: SoulInfo | null;
  emblem_info?: EmblemInfo | null;
}

// ==========================================================================
// 3. 안드로이드 전용 하위 구조
// ==========================================================================

// 안드로이드가 착용한 캐시 아이템
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

// 안드로이드 본체 정보
export interface CharacterAndroidEquipment {
  android_name: string;
  android_nickname: string;
  android_icon: string;
  android_description: string;
  android_grade: string;
  android_gender: string;
  android_non_humanoid_flag: string; // "0" or "1"
  android_warehouse_usable_flag: string; // "0" or "1"
  android_ear_sensor_clip_flag?: string; // "0" or "1" (신규 추가)
  android_cash_item_equipment: AndroidCashItemEquipment[];
}

// 기계 심장 정보
export interface CharacterHeartEquipment {
  heart_name: string;
  heart_icon: string;
  heart_description: string;
  item_additional_option_grade: string;
  item_potential_option_grade: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
}

// 안드로이드 프리셋 구조
export interface AndroidHeartPreset {
  preset_no: number;
  android_equipment: CharacterAndroidEquipment | null;
  heart_equipment: CharacterHeartEquipment | null;
}

// ==========================================================================
// 4. API Response 타입 정의
// ==========================================================================

// 장비 조회 (/item-equipment)
export interface CharacterEquipmentResponse {
  character_class: string;
  use_preset_no?: number;
  item_equipment: CharacterItemEquipment[];
  soul_set_option?: string;
  equipment_preset?: EquipmentPreset[];
}

// 장비 프리셋 구조
export interface EquipmentPreset {
  preset_no: number;
  item_equipment: CharacterItemEquipment[];
}

// 기본 정보 (/basic)
export interface CharacterBasicResponse {
  character_name: string;
  world_name: string;
  character_level: number;
  character_class: string;
  character_gender: string;
  character_exp: number;
  character_exp_rate: string;
  character_date_create: string;
  character_date_last_login: string;
  character_date_last_logout: string;
  character_image: string;
}

// 안드로이드 장비 조회 (/android-equipment)
export interface CharacterAndroidResponse {
  use_preset_no?: number;
  android_equipment: CharacterAndroidEquipment | null;
  heart_equipment: CharacterHeartEquipment | null;
  android_heart_equipment_preset?: AndroidHeartPreset[];
}

// 세트 효과 (/set-effect)
export interface CharacterSetInfo {
  set_name: string;
  set_count: number;
  set_option: string;
}

// ==========================================================================
// 5. 통합 캐릭터 상세 정보 (프론트엔드 전달용)
// ==========================================================================
export interface CharacterDetailData extends CharacterBasicResponse {
  // 추가 정보
  guild_name?: string;

  // --------------------------------------------------------
  // 장비 정보 (Equipment)
  // --------------------------------------------------------
  use_preset_no?: number; // 현재 장비 프리셋 번호
  soul_set_option?: string;
  item_equipment: CharacterItemEquipment[];
  equipment_preset?: EquipmentPreset[];

  // --------------------------------------------------------
  // 안드로이드 정보 (Android)
  // --------------------------------------------------------
  android_use_preset_no?: number; // 현재 안드로이드 프리셋 번호
  android_equipment?: CharacterAndroidEquipment | null;
  heart_equipment?: CharacterHeartEquipment | null;
  android_preset?: AndroidHeartPreset[]; // 안드로이드 프리셋 목록

  // --------------------------------------------------------
  // 세트 효과
  // --------------------------------------------------------
  set_effect?: CharacterSetInfo[];
}
