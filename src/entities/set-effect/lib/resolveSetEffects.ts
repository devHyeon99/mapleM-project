import { CharacterItemEquipment } from "@/entities/item";
import { EquipmentSetDefinition, ResolvedSetEffectRow } from "../model";

// 세트 스타포스 계산용으로 장비 한 개의 스타포스를 숫자로 변환
export function parseStarForce(item: CharacterItemEquipment): number {
  const value = item.starforce_upgrade;
  if (!value) return 0;

  const parsedValue = Number.parseInt(value, 10) || 0;
  const isDoubleCountedSlot =
    item.item_equipment_slot_name === "한벌옷" ||
    item.item_equipment_page_name === "한벌옷";

  return isDoubleCountedSlot ? parsedValue * 2 : parsedValue;
}

// 현재 세트 수에 맞는 세트 효과만 해석
export function resolveSetEffects(
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

// 누적 스타포스에 맞는 세트 스타포스 효과를 해석
export function resolveStarForceEffects(
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

// 일반 세트 효과와 스타포스 효과를 같은 능력치 기준으로 합산
export function combineEffects(
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
