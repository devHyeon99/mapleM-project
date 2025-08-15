import {
  CharacterItemEquipment,
  EquipmentPreset,
  EquipmentSetInfo,
} from "./equipment";
import {
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
  AndroidHeartPreset,
} from "./android";
import { CharacterUnionInfo } from "./union";
import { CharacterBasicInfo } from "./basic";
import { LevelRankingInfo, UnionRankingInfo } from "./ranking";

// ==========================================================================
// 4. API Response 타입 정의
// ==========================================================================

// 기본 정보 (/basic)
export type CharacterBasicResponse = CharacterBasicInfo;

// 레벨 랭킹 (/ranking/level)
export interface CharacterLevelRankingResponse {
  ranking: LevelRankingInfo[];
}

// 길드 정보 (/character/guild)
export interface CharacterGuildResponse {
  guild_name: string | null;
}

// 유니온 정보 (/user/union)
export type CharacterUnionResponse = CharacterUnionInfo;

// 유니온 랭킹 (/ranking/union)
export interface CharacterUnionRankingResponse {
  ranking: UnionRankingInfo[];
}

// 장비 조회 (/item-equipment)
export interface CharacterEquipmentResponse {
  character_class: string | null;
  use_preset_no?: number | null;
  item_equipment: CharacterItemEquipment[];
  soul_set_option?: string | null;
  equipment_preset?: EquipmentPreset[];
}

// 장비 세트 효과 조회 (/set-effect)
export interface CharacterEquipmentSetResponse {
  set_info: EquipmentSetInfo[];
}

// 안드로이드 장비 조회 (/android-equipment)
export interface CharacterAndroidResponse {
  use_preset_no?: number;
  android_equipment: CharacterAndroidEquipment | null;
  heart_equipment: CharacterHeartEquipment | null;
  android_heart_equipment_preset?: AndroidHeartPreset[];
}
