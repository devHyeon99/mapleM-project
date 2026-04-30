import {
  AndroidEquipment,
  AndroidHeartEquipmentPreset,
  HeartEquipment,
} from "../domain/android-equipment";

/** 안드로이드 장비 조회 API 응답 (/character/android-equipment) */
export interface CharacterAndroidEquipment {
  use_preset_no?: number;
  android_equipment: AndroidEquipment | null;
  heart_equipment: HeartEquipment | null;
  android_heart_equipment_preset?: AndroidHeartEquipmentPreset[];
}
