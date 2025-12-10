import {
  combineEffects,
  resolveSetEffects,
  resolveStarForceEffects,
} from "@/entities/set-effect";

import {
  SELECTABLE_SET_DEFINITIONS,
  SET_BY_ID,
  STAR_FORCE_THRESHOLDS_BY_SET_ID,
} from "./constants";
import type { BuildResult, BuildState, DiffEffectRow } from "./types";

export const getStarForceThresholds = (setId: string): number[] => {
  // 세트별 허용 스타포스 값 조회
  return STAR_FORCE_THRESHOLDS_BY_SET_ID.get(setId) ?? [];
};

export const getClampedCount = (setId: string, count: number) => {
  // 세트 수량을 유효 범위로 보정
  const parsed = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  if (setId === "none") return 0;

  const definition = SET_BY_ID.get(setId);
  if (!definition) return 0;

  return Math.min(parsed, definition.maxSetCount);
};

export const getClampedStarForce = (setId: string, starForce: number) => {
  // 스타포스를 허용된 threshold 값으로 보정
  const thresholds = getStarForceThresholds(setId);
  if (thresholds.length === 0) return 0;

  if (!Number.isFinite(starForce)) return 0;
  const parsed = Math.max(0, Math.floor(starForce));

  return thresholds.includes(parsed) ? parsed : 0;
};

export const buildResultFromState = (rows: BuildState): BuildResult => {
  // row 단위 입력을 세트 단위 결과로 변환
  const countMap = new Map<string, { count: number; totalStarForce: number }>();

  rows.forEach((row) => {
    // 선택 안 함은 계산 대상 제외
    if (row.setId === "none") return;

    // row 값을 먼저 보정한 뒤 집계
    const count = getClampedCount(row.setId, row.count);
    if (count === 0) return;

    const starForce = getClampedStarForce(row.setId, row.starForce);

    const prev = countMap.get(row.setId);
    if (!prev) {
      countMap.set(row.setId, { count, totalStarForce: starForce });
      return;
    }

    prev.count += count;
    prev.totalStarForce += starForce;
  });

  // 세트 정의 기준으로 효과를 전부 계산
  const activeSets = SELECTABLE_SET_DEFINITIONS.map((definition) => {
    const selected = countMap.get(definition.id) ?? {
      count: 0,
      totalStarForce: 0,
    };
    const count = Math.max(0, Math.min(selected.count, definition.maxSetCount));
    const totalStarForce = Math.max(0, selected.totalStarForce);

    const setEffects = resolveSetEffects(definition, count);
    const { appliedThreshold, effects: starForceEffects } =
      resolveStarForceEffects(definition, totalStarForce);
    const combinedEffects = combineEffects(setEffects, starForceEffects);

    return {
      id: definition.id,
      displayName: definition.displayName,
      count,
      totalStarForce,
      appliedThreshold,
      combinedEffects,
    };
  }).filter((set) => set.count > 0);

  // 같은 effect key끼리 합산
  const totalMap = new Map<string, BuildResult["totalEffects"][number]>();
  activeSets.forEach((set) => {
    set.combinedEffects.forEach((effect) => {
      if (effect.value == null) return;
      const prev = totalMap.get(effect.key);

      if (!prev) {
        totalMap.set(effect.key, {
          key: effect.key,
          label: effect.label,
          unit: effect.unit,
          value: effect.value,
        });
        return;
      }

      prev.value += effect.value;
    });
  });

  // 보기 좋게 label 기준 정렬
  const totalEffects = Array.from(totalMap.values()).sort((a, b) =>
    a.label.localeCompare(b.label, "ko"),
  );

  return {
    activeSets: activeSets.map((set) => ({
      id: set.id,
      displayName: set.displayName,
      count: set.count,
      totalStarForce: set.totalStarForce,
      appliedThreshold: set.appliedThreshold,
    })),
    totalEffects,
  };
};

export const buildDiffEffects = (
  effectsA: BuildResult["totalEffects"],
  effectsB: BuildResult["totalEffects"],
): DiffEffectRow[] => {
  // A, B 양쪽 effect를 key 기준으로 비교
  const mapA = new Map(effectsA.map((effect) => [effect.key, effect]));
  const mapB = new Map(effectsB.map((effect) => [effect.key, effect]));
  const keys = new Set<string>([...mapA.keys(), ...mapB.keys()]);

  return (
    Array.from(keys)
      .map((key) => {
        // B - A 차이 계산
        const effectA = mapA.get(key);
        const effectB = mapB.get(key);

        const valueA = effectA?.value ?? 0;
        const valueB = effectB?.value ?? 0;
        const delta = valueB - valueA;
        if (delta === 0) return null;

        return {
          key,
          label: effectB?.label ?? effectA?.label ?? key,
          unit: effectB?.unit ?? effectA?.unit ?? "%",
          delta,
        };
      })
      // 변화가 없는 값은 제거
      .filter((effect): effect is DiffEffectRow => effect !== null)
      // 변화량이 큰 순서로 정렬
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
  );
};
