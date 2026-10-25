export * from "./view/item-display";
// 넥슨 장비 응답 타입은 shared/api/nexon 소유. 슬라이스 내부와 기존 소비처 호환을 위한 재노출
export type {
  ItemOption,
  CharacterItemEquipment,
  EquipmentPreset,
  SoulInfo,
  EmblemInfo,
  MasteryInfo,
  EquipmentSetInfo,
  AndroidEquipment,
  HeartEquipment,
  AndroidHeartEquipmentPreset,
  CharacterItemEquipmentResponse,
  CharacterAndroidEquipment,
} from "@/shared/api/nexon";
