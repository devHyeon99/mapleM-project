import { ItemOption } from "./item-option";

// ==========================================================================
// 1. API Response 타입 (넥슨 API 응답 구조)
// ==========================================================================

/** 장비 조회 API 응답 (/character/item-equipment) */
export interface CharacterItemEquipmentResponse {
  character_class: string | null;
  use_preset_no?: number | null;
  item_equipment: CharacterItemEquipment[];
  soul_set_option?: string | null;
  equipment_preset?: EquipmentPreset[];
}

/** 장비 세트 효과 조회 API 응답 (/character/set-effect) */
export interface CharacterEquipmentSetResponse {
  set_info: EquipmentSetInfo[];
}

// ==========================================================================
// 2. 도메인 모델 (UI 및 로직에서 사용할 구조)
// ==========================================================================

/** 장비 아이템 상세 구조 */
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
  item_basic_option: ItemOption[];
  item_additional_option: ItemOption[];
  item_potential_option: ItemOption[];
  item_additional_potential_option: ItemOption[];

  // 소울 & 엠블렘
  soul_equipment_flag?: string;
  soul_info?: SoulInfo | null;
  emblem_info?: EmblemInfo | null;
}

export interface EquipmentPreset {
  preset_no: number;
  item_equipment: CharacterItemEquipment[];
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

export interface EquipmentSetInfo {
  set_name: string;
  set_count: number;
  set_option: string;
}
