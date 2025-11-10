import { CharacterItemEquipment } from "../domain/item-equipment";

export type ItemSourceType = "equipment" | "android" | "heart";

export interface ItemDisplay extends CharacterItemEquipment {
  source: ItemSourceType;
}
