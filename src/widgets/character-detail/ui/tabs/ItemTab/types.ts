import type { CharacterDetailData } from "@/entities/character/model/types";

export type CharacterItemTabData = Pick<
  CharacterDetailData,
  | "character_class"
  | "item_equipment"
  | "equipment_preset"
  | "use_preset_no"
  | "android_use_preset_no"
  | "android_equipment"
  | "heart_equipment"
  | "android_preset"
>;
