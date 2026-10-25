import type { CharacterItemEquipment } from "@/shared/api/nexon";

export type ItemSourceType = "equipment" | "android" | "heart";

export interface ItemDisplay extends CharacterItemEquipment {
  source: ItemSourceType;
}
