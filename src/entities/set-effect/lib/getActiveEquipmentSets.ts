import { CharacterItemEquipment } from "@/entities/item";

import { ActiveEquipmentSet, EQUIPMENT_SET_DEFINITIONS } from "../model";
import {
  applyGenesisLuckyItem,
  findGenesisLuckyWeapon,
} from "./genesisLuckyItem";
import { isMatchingSetItem } from "./matchSetItems";
import {
  combineEffects,
  resolveSetEffects,
  resolveStarForceEffects,
} from "./resolveSetEffects";

export { EQUIPMENT_SET_DEFINITIONS } from "../model";

// 착용 장비 기준으로 활성 세트 효과 목록 계산
export function getActiveEquipmentSets(
  items: Array<CharacterItemEquipment | null | undefined>,
): ActiveEquipmentSet[] {
  const equippedItems = items.filter(
    (item): item is CharacterItemEquipment => !!item,
  );
  const genesisLuckyWeapon = findGenesisLuckyWeapon(equippedItems);

  return EQUIPMENT_SET_DEFINITIONS.map((definition) => {
    const matchedItems = equippedItems.filter((item) =>
      isMatchingSetItem(item, definition),
    );
    const { count, totalStarForce } = applyGenesisLuckyItem(
      definition,
      matchedItems,
      genesisLuckyWeapon,
    );
    const { appliedThreshold, effects: starForceEffects } =
      resolveStarForceEffects(definition, totalStarForce);
    const setEffects = resolveSetEffects(definition, count);

    return {
      definition,
      activeSet: {
        id: definition.id,
        displayName: definition.displayName,
        count,
        effects: setEffects,
        totalStarForce,
        appliedStarForceThreshold: appliedThreshold,
        starForceEffects,
        combinedEffects: combineEffects(setEffects, starForceEffects),
      },
    };
  })
    .filter(({ activeSet }) => activeSet.count > 0)
    .sort(
      (a, b) => a.definition.displayOrder - b.definition.displayOrder,
    )
    .map(({ activeSet }) => activeSet);
}
