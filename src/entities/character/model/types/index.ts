// ==========================================================================
// 하위 모듈 Re-export (외부에서 바로 접근 가능하도록 설정)
// ==========================================================================
export * from "./common";
export * from "./basic";
export * from "./equipment";
export * from "./android";
export * from "./union";
export * from "./api-response";
export * from "./stat";
export * from "./jewel";
export * from "./symbol";
export * from "./hexa-stat";
export * from "./ranking";

// ==========================================================================
// 통합 타입 조립을 위한 Import
// ==========================================================================
import { CharacterBasicInfo } from "./basic";
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
import { LevelRankingInfo, UnionRankingInfo } from "./ranking";

// ==========================================================================
// 통합 캐릭터 상세 정보 (CharacterDetailData)
// - CharacterDetail 에서 사용하는 최종 타입
// - CharacterBasicInfo를 상속받고, 나머지 정보들을 조합
// ==========================================================================
export interface CharacterDetailData extends CharacterBasicInfo {
  // --------------------------------------------------------
  // 캐릭터 추가 정보 (Guild, Union, Ranking)
  // --------------------------------------------------------
  guild_name?: string | null;
  level_ranking?: LevelRankingInfo | null;
  union_data?: CharacterUnionInfo | null;
  union_ranking?: UnionRankingInfo | null;

  // --------------------------------------------------------
  // 장비 정보 (Equipment)
  // --------------------------------------------------------
  item_equipment: CharacterItemEquipment[]; // 현재 착용 장비
  equipment_preset?: EquipmentPreset[]; // 장비 프리셋 목록
  use_preset_no?: number | null; // 현재 장비 프리셋 번호
  soul_set_option?: string | null; // 소울 세트 효과
  set_effect?: EquipmentSetInfo[]; // 현재 장착 중인 장비 세트 효과

  // --------------------------------------------------------
  // 안드로이드 정보 (Android)
  // --------------------------------------------------------
  android_use_preset_no?: number; // 현재 안드로이드 프리셋 번호
  android_equipment?: CharacterAndroidEquipment | null; // 안드로이드 본체
  heart_equipment?: CharacterHeartEquipment | null; // 기계 심장
  android_preset?: AndroidHeartPreset[]; // 안드로이드 프리셋 목록
}
