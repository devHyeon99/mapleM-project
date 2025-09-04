import {
  CharacterItemEquipment,
  EquipmentPreset,
  EquipmentSetInfo,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
  AndroidHeartPreset,
} from "@/entities/item";
import { CharacterBasic } from "./basic";
import { CharacterUnion } from "./union";
import { LevelRanking, UnionRanking } from "./ranking";

/**
 * 통합 캐릭터 상세 정보 (CharacterDetailData)
 * - 캐릭터 상세 페이지 및 카드 UI에서 사용하는 최종 데이터 구조
 */
export interface CharacterDetailData extends CharacterBasic {
  ocid: string;

  // 캐릭터 추가 정보
  guild_name?: string | null;
  level_ranking?: LevelRanking | null;
  union_data?: CharacterUnion | null;
  union_ranking?: UnionRanking | null;

  // 장비 정보
  item_equipment: CharacterItemEquipment[];
  equipment_preset?: EquipmentPreset[];
  use_preset_no?: number | null;
  soul_set_option?: string | null;
  set_effect?: EquipmentSetInfo[];

  // 안드로이드 정보
  android_use_preset_no?: number;
  android_equipment?: CharacterAndroidEquipment | null;
  heart_equipment?: CharacterHeartEquipment | null;
  android_preset?: AndroidHeartPreset[];
}
