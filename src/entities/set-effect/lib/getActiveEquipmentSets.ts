import { CharacterItemEquipment } from "@/entities/item";

import {
  ActiveEquipmentSet,
  EquipmentSetDefinition,
  EquipmentSetItemMatcher,
  ItemNameNormalization,
  ResolvedSetEffectRow,
} from "../model";
import {
  ARCANE_SHADE_SET,
  ABSOLABS_SET,
  CHALLENGER_SET,
  ROOT_ABYSS_UNIQUE_SET,
  ROOT_ABYSS_LEGENDARY_SET,
  PENSALIR_LEGENDARY_SET,
  PENSALIR_UNIQUE_SET,
  MUSPELL_LEGENDARY_SET,
  MUSPELL_UNIQUE_SET,
  DAWN_BOSS_SET,
  COMMANDER_LOOT_SET,
  EXPEDITION_BOSS_LOOT_SET,
} from "../model";

export const EQUIPMENT_SET_DEFINITIONS: EquipmentSetDefinition[] = [
  ARCANE_SHADE_SET,
  ABSOLABS_SET,
  CHALLENGER_SET,
  ROOT_ABYSS_UNIQUE_SET,
  ROOT_ABYSS_LEGENDARY_SET,
  PENSALIR_LEGENDARY_SET,
  PENSALIR_UNIQUE_SET,
  MUSPELL_LEGENDARY_SET,
  MUSPELL_UNIQUE_SET,
  DAWN_BOSS_SET,
  COMMANDER_LOOT_SET,
  EXPEDITION_BOSS_LOOT_SET,
];

function normalizeItemName(
  itemName: string,
  strategy: ItemNameNormalization = "none",
) {
  if (strategy === "stripBracketPrefix") {
    return itemName.replace(/^\[[^\]]+\]\s*/, "");
  }

  return itemName;
}

// 아이템이 특정 세트 정의에 포함되는지 판별
function isMatchingSetItem(
  item: CharacterItemEquipment,
  definition: EquipmentSetDefinition,
) {
  const normalizedItemName = normalizeItemName(
    item.item_name,
    definition.nameNormalization,
  );

  if (
    definition.itemGrades?.length &&
    !definition.itemGrades.includes(item.item_grade)
  ) {
    return false;
  }

  const hasExactName =
    definition.itemNames?.includes(item.item_name) ||
    definition.itemNames?.includes(normalizedItemName) ||
    false;
  const hasPrefix =
    definition.itemNamePrefixes?.some(
      (prefix) =>
        item.item_name.startsWith(prefix) ||
        normalizedItemName.startsWith(prefix),
    ) ?? false;
  const hasSuffix =
    definition.itemNameSuffixes?.some(
      (suffix) =>
        item.item_name.endsWith(suffix) || normalizedItemName.endsWith(suffix),
    ) ?? false;
  const hasMatcher =
    definition.itemMatchers?.some((matcher) =>
      isMatchingItemMatcher(item, matcher, normalizedItemName),
    ) ?? false;

  return hasExactName || hasPrefix || hasSuffix || hasMatcher;
}

// 이름/부위/등급 조건 단위 매처 검사
function isMatchingItemMatcher(
  item: CharacterItemEquipment,
  matcher: EquipmentSetItemMatcher,
  normalizedItemName: string,
) {
  if (
    matcher.itemGrades?.length &&
    !matcher.itemGrades.includes(item.item_grade)
  ) {
    return false;
  }

  if (
    matcher.equipmentLevels?.length &&
    !matcher.equipmentLevels.includes(item.equipment_level ?? -1)
  ) {
    return false;
  }

  if (
    matcher.itemSlotName &&
    matcher.itemSlotName !== item.item_equipment_slot_name
  ) {
    return false;
  }

  if (
    matcher.itemPageName &&
    matcher.itemPageName !== item.item_equipment_page_name
  ) {
    return false;
  }

  if (
    matcher.itemName &&
    matcher.itemName !== item.item_name &&
    matcher.itemName !== normalizedItemName
  ) {
    return false;
  }

  if (
    matcher.itemNamePrefix &&
    !item.item_name.startsWith(matcher.itemNamePrefix) &&
    !normalizedItemName.startsWith(matcher.itemNamePrefix)
  ) {
    return false;
  }

  if (
    matcher.itemNameSuffix &&
    !item.item_name.endsWith(matcher.itemNameSuffix) &&
    !normalizedItemName.endsWith(matcher.itemNameSuffix)
  ) {
    return false;
  }

  return true;
}

// 현재 세트 수에 맞는 세트 효과만 해석
function resolveSetEffects(
  definition: EquipmentSetDefinition,
  count: number,
): ResolvedSetEffectRow[] {
  if (count < definition.minSetCount) {
    return [];
  }

  const normalizedCount = Math.min(count, definition.maxSetCount);

  return definition.setEffects
    .map((effect) => {
      const availableCounts = Object.keys(effect.values)
        .map(Number)
        .filter((value) => value <= normalizedCount)
        .sort((a, b) => a - b);
      const appliedCount = availableCounts.at(-1);

      return {
        key: effect.key,
        label: effect.label,
        unit: effect.unit,
        value: appliedCount == null ? null : effect.values[appliedCount],
      };
    })
    .filter((effect) => effect.value !== null);
}

// 부위별 스타포스를 세트 합산용 숫자로 변환
function parseStarForce(item: CharacterItemEquipment): number {
  const value = item.starforce_upgrade;
  if (!value) return 0;

  const parsedValue = Number.parseInt(value, 10) || 0;
  const isDoubleCountedSlot =
    item.item_equipment_slot_name === "한벌옷" ||
    item.item_equipment_page_name === "한벌옷";

  return isDoubleCountedSlot ? parsedValue * 2 : parsedValue;
}

// 누적 스타포스에 맞는 스타포스 세트 효과 해석
function resolveStarForceEffects(
  definition: EquipmentSetDefinition,
  totalStarForce: number,
): {
  appliedThreshold: number | null;
  effects: ResolvedSetEffectRow[];
} {
  if (!definition.starForceEffects?.length) {
    return {
      appliedThreshold: null,
      effects: [],
    };
  }

  const thresholds = definition.starForceEffects
    .flatMap((effect) => Object.keys(effect.values).map(Number))
    .filter((value, index, array) => array.indexOf(value) === index)
    .sort((a, b) => a - b);

  const appliedThreshold =
    thresholds.filter((threshold) => totalStarForce >= threshold).at(-1) ??
    null;

  const effects = definition.starForceEffects
    .map((effect) => {
      return {
        key: effect.key,
        label: effect.label,
        unit: effect.unit,
        value:
          appliedThreshold === null ? null : effect.values[appliedThreshold],
      };
    })
    .filter((effect) => effect.value !== null);

  return {
    appliedThreshold,
    effects,
  };
}

// 세트 효과와 스타포스 효과를 하나로 합산
function combineEffects(
  setEffects: ResolvedSetEffectRow[],
  starForceEffects: ResolvedSetEffectRow[],
): ResolvedSetEffectRow[] {
  const effectMap = new Map<string, ResolvedSetEffectRow>();

  [...setEffects, ...starForceEffects].forEach((effect) => {
    const existing = effectMap.get(effect.key);

    if (!existing) {
      effectMap.set(effect.key, { ...effect });
      return;
    }

    effectMap.set(effect.key, {
      ...existing,
      value: (existing.value ?? 0) + (effect.value ?? 0),
    });
  });

  return Array.from(effectMap.values());
}

// 착용 장비 기준으로 활성 세트 효과 목록 계산
export function getActiveEquipmentSets(
  items: Array<CharacterItemEquipment | null | undefined>,
): ActiveEquipmentSet[] {
  return EQUIPMENT_SET_DEFINITIONS.map((definition) => {
    const matchedItems = items.filter(
      (item): item is CharacterItemEquipment =>
        !!item && isMatchingSetItem(item, definition),
    );
    const count = matchedItems.length;
    const totalStarForce = matchedItems.reduce((sum, item) => {
      return sum + parseStarForce(item);
    }, 0);
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
