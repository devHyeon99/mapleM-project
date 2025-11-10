import {
  AndroidHeartPreset,
  CharacterAndroidEquipment,
  CharacterHeartEquipment,
} from "../domain/android-equipment";

/** 안드로이드 장비 조회 API 응답 (/character/android-equipment) */
export interface CharacterAndroidResponse {
  use_preset_no?: number;
  android_equipment: CharacterAndroidEquipment | null;
  heart_equipment: CharacterHeartEquipment | null;
  android_heart_equipment_preset?: AndroidHeartPreset[];
}
