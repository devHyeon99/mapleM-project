import type { CharacterItemEquipment } from "@/entities/item";

import { ActiveEquipmentSet, EQUIPMENT_SET_DEFINITIONS } from "../model";
import {
  ABSOLABS_CORRECTION_SET_IDS,
  correctAbsolabsSet,
} from "./absolabsCorrection";
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

  // 세트 간 보정을 하려면 모든 세트의 착용 수가 먼저 필요함
  const matchedSets = EQUIPMENT_SET_DEFINITIONS.map((definition) => {
    const matchedItems = equippedItems.filter((item) =>
      isMatchingSetItem(item, definition),
    );

    return {
      definition,
      ...applyGenesisLuckyItem(definition, matchedItems, genesisLuckyWeapon),
    };
  });

  const arcaneShade = matchedSets.find(
    ({ definition }) => definition.id === ABSOLABS_CORRECTION_SET_IDS.source,
  ) ?? { count: 0, totalStarForce: 0 };

  return matchedSets
    .map(({ definition, count: matched, totalStarForce: matchedStarForce }) => {
      const {
        count,
        totalStarForce,
        applied: correctedFromArcaneShade,
      } = definition.id === ABSOLABS_CORRECTION_SET_IDS.target
        ? correctAbsolabsSet(arcaneShade, {
            count: matched,
            totalStarForce: matchedStarForce,
          })
        : {
            count: matched,
            totalStarForce: matchedStarForce,
            applied: false,
          };

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
          correctedFromArcaneShade,
        },
      };
    })
    .filter(({ activeSet }) => activeSet.count > 0)
    .sort((a, b) => a.definition.displayOrder - b.definition.displayOrder)
    .map(({ activeSet }) => activeSet);
}
