import { CharacterItemEquipment } from "@/entities/item";
import {
  ABSOLABS_SET,
  ARCANE_SHADE_SET,
  CHALLENGER_SET,
  EquipmentSetDefinition,
  ROOT_ABYSS_LEGENDARY_SET,
  ROOT_ABYSS_UNIQUE_SET,
} from "../model";
import { parseStarForce } from "./resolveSetEffects";

const GENESIS_LUCKY_ITEM_SET_IDS = new Set<string>([
  ARCANE_SHADE_SET.id,
  ABSOLABS_SET.id,
  CHALLENGER_SET.id,
  ROOT_ABYSS_UNIQUE_SET.id,
  ROOT_ABYSS_LEGENDARY_SET.id,
]);

// 착용 장비 중 제네시스 무기를 찾아 럭키 아이템 대상으로 반환
export function findGenesisLuckyWeapon(
  items: CharacterItemEquipment[],
): CharacterItemEquipment | null {
  return (
    items.find(
      (item) =>
        item.item_equipment_slot_name === "무기" &&
        (item.item_name ?? "").includes("제네시스"),
    ) ?? null
  );
}

// 제네시스 무기 럭키 규칙을 반영해 세트 수와 스타포스를 보정
export function applyGenesisLuckyItem(
  definition: EquipmentSetDefinition,
  matchedItems: CharacterItemEquipment[],
  genesisLuckyWeapon: CharacterItemEquipment | null,
) {
  const baseCount = matchedItems.length;
  const matchedStarForce = matchedItems.reduce((sum, item) => {
    return sum + parseStarForce(item);
  }, 0);
  const luckyItemApplied =
    !!genesisLuckyWeapon &&
    GENESIS_LUCKY_ITEM_SET_IDS.has(definition.id) &&
    baseCount >= 3 &&
    baseCount < definition.maxSetCount;

  return {
    count: luckyItemApplied ? baseCount + 1 : baseCount,
    totalStarForce: luckyItemApplied
      ? matchedStarForce + parseStarForce(genesisLuckyWeapon)
      : matchedStarForce,
  };
}
