import {
  CharacterItemEquipment,
  EquipmentPreset,
} from "../domain/item-equipment";

/** 장비 조회 API 응답 (/character/item-equipment) */
export interface CharacterItemEquipmentResponse {
  character_class: string | null;
  use_preset_no?: number | null;
  item_equipment: CharacterItemEquipment[];
  soul_set_option?: string | null;
  equipment_preset?: EquipmentPreset[];
}
