// ==========================================================================
// 1. 공통 하위 객체 (옵션, 소울, 엠블렘)
// ==========================================================================

// 잠재/에디셔널/추가 옵션
export interface ItemOption {
  option_no: number;
  option_name: string | null;
  option_value: string | null;
}

// 소울 정보
export interface SoulInfo {
  soul_name: string;
  soul_option: string;
  description?: string;
}

// 엠블렘(문장) 정보
export interface EmblemInfo {
  emblem_name: string;
  emblem_level: number;
  emblem_option: string;
  description?: string;
}

// ==========================================================================
// 2. 장비 아이템 상세 구조
// ==========================================================================
export interface CharacterItemEquipment {
  item_name: string;
  item_equipment_page_name: string; // 장착 부위
  item_equipment_slot_name: string; // 슬롯 위치
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
// 3. 프리셋 구조
// ==========================================================================
export interface EquipmentPreset {
  preset_no: number;
  item_equipment: CharacterItemEquipment[];
}

// ==========================================================================
// 4. API Response: 장비 조회 (/item-equipment)
// ==========================================================================
export interface CharacterEquipmentResponse {
  character_class: string;
  use_preset_no?: number;
  item_equipment: CharacterItemEquipment[];
  soul_set_option?: string;
  equipment_preset?: EquipmentPreset[];
}

// ==========================================================================
// 5. API Response: 기본 정보 (/basic)
// ==========================================================================
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

// ==========================================================================
// 6. 기타 장비 (안드로이드, 하트, 세트효과)
// ==========================================================================
export interface CharacterAndroidEquipment {
  android_name: string;
  android_icon: string;
  android_description: string;
  android_grade: string;
  android_gender: string;
  android_non_humanoid_flag: string;
  android_warehouse_usable_flag: string;
  android_cash_item_equipment: CharacterItemEquipment[];
}

export interface CharacterHeartEquipment {
  heart_name: string;
  heart_icon: string;
  heart_description: string;
  item_additional_option_grade: string;
  item_potential_option_grade: string;
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
}

export interface CharacterSetInfo {
  set_name: string;
  set_count: number;
  set_option: string;
}

// ==========================================================================
// 7. 통합 캐릭터 상세 정보 (프론트엔드 전달용)
// ==========================================================================
// CharacterBasicResponse를 확장(extends)하여 기본 필드를 모두 포함
export interface CharacterDetailData extends CharacterBasicResponse {
  // 추가 정보 (API 병렬 호출로 합쳐지는 필드들)
  guild_name?: string;

  // 장비 정보
  item_equipment: CharacterItemEquipment[]; // 현재 장착
  equipment_preset?: EquipmentPreset[]; // 프리셋 정보

  // 기타 장비
  android_equipment?: CharacterAndroidEquipment | null;
  heart_equipment?: CharacterHeartEquipment | null;

  // 세트 효과
  set_effect?: CharacterSetInfo[];
}
