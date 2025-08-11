import type {
  CharacterItemEquipment,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
} from "@/shared/model/types/nexon-models";

// ----------------------
// 캐릭터 기본 정보
// ----------------------
export interface CharacterBasicInfo {
  character_name: string;
  world_name: string;
  character_level: number;
  character_class: string;
  character_gender?: string;
  character_image?: string;
  character_exp?: number;
  character_exp_rate?: string;
  character_date_create?: string;
  character_date_last_login?: string;
  character_date_last_logout?: string;
  guild_name?: string;
  item_equipment?: CharacterItemEquipment[];
  android_equipment?: CharacterAndroidEquipment | null;
  heart_equipment?: CharacterHeartEquipment | null;
}
