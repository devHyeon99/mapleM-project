import type { CharacterItemEquipment } from "@/entities/item";

import { ActiveEquipmentSet, EQUIPMENT_SET_DEFINITIONS } from "../model";
import { ABSOLABS_CORRECTION_SET_IDS } from "./absolabsCorrection";
import {
  applyGenesisLuckyItem,
  findGenesisLuckyWeapon,
} from "./genesisLuckyItem";
import { isMatchingSetItem } from "./matchSetItems";
import { resolveActiveSet } from "./resolveSetEffects";

// 착용 장비 기준으로 활성 세트 효과 목록 계산
export function getActiveEquipmentSets(
  items: Array<CharacterItemEquipment | null | undefined>,
): ActiveEquipmentSet[] {
  const equippedItems = items.filter(
    (item): item is CharacterItemEquipment => !!item,
  );
  const genesisLuckyWeapon = findGenesisLuckyWeapon(equippedItems);

  // 세트 간 보정을 하려면 모든 세트의 착용 수가 먼저 필요함
  const matchedBySetId = new Map(
    EQUIPMENT_SET_DEFINITIONS.map((definition) => [
      definition.id,
      applyGenesisLuckyItem(
        definition,
        equippedItems.filter((item) => isMatchingSetItem(item, definition)),
        genesisLuckyWeapon,
      ),
    ]),
  );

  const arcaneShade = matchedBySetId.get(
    ABSOLABS_CORRECTION_SET_IDS.source,
  ) ?? { count: 0, totalStarForce: 0 };

  return EQUIPMENT_SET_DEFINITIONS.map((definition) =>
    resolveActiveSet(
      definition,
      matchedBySetId.get(definition.id)!,
      arcaneShade,
    ),
  ).filter((set) => set.count > 0);
}
