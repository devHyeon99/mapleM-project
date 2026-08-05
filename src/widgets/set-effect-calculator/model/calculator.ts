import {
  ABSOLABS_CORRECTION_SET_IDS,
  resolveActiveSet,
} from "@/entities/set-effect";

import {
  MAX_STAR_FORCE_BY_SET_ID,
  NONE_SET_ID,
  SELECTABLE_SET_DEFINITIONS,
  SET_BY_ID,
} from "./constants";
import type {
  ActiveSetSummary,
  BuildResult,
  BuildState,
  ComparisonRow,
} from "./types";

// 활성 세트 한 줄 표기 — 칩 안에 들어가야 해서 스타포스는 별 기호로 줄임
export const formatActiveSet = (set: ActiveSetSummary) =>
  [
    `${set.count}세트`,
    set.totalStarForce > 0 ? `★${set.totalStarForce}` : null,
    set.correctedFromArcaneShade ? "보정" : null,
  ]
    .filter(Boolean)
    .join(" · ");

export const getClampedCount = (setId: string, count: number) => {
  // 세트 수량을 유효 범위로 보정
  const parsed = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;
  if (setId === NONE_SET_ID) return 0;

  const definition = SET_BY_ID.get(setId);
  if (!definition) return 0;

  return Math.min(parsed, definition.maxSetCount);
};

export const getMaxStarForce = (setId: string): number =>
  MAX_STAR_FORCE_BY_SET_ID.get(setId) ?? 0;

export const getClampedStarForce = (setId: string, starForce: number) => {
  // 스타포스를 0 ~ 세트 최고 구간 범위로 보정
  const max = getMaxStarForce(setId);
  if (max === 0 || !Number.isFinite(starForce)) return 0;

  return Math.min(Math.max(0, Math.floor(starForce)), max);
};

export const buildResultFromState = (rows: BuildState): BuildResult => {
  // row 단위 입력을 세트 단위 결과로 변환
  const countMap = new Map<string, { count: number; totalStarForce: number }>();

  rows.forEach((row) => {
    // 선택 안 함은 계산 대상 제외
    if (row.setId === NONE_SET_ID) return;

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

  const arcaneShadeSelected = countMap.get(ABSOLABS_CORRECTION_SET_IDS.source);
  const arcaneShade = {
    count: Math.min(
      arcaneShadeSelected?.count ?? 0,
      SET_BY_ID.get(ABSOLABS_CORRECTION_SET_IDS.source)?.maxSetCount ?? 0,
    ),
    totalStarForce: arcaneShadeSelected?.totalStarForce ?? 0,
  };

  // 선택된 세트만 정의 순서대로 계산
  const activeSets = SELECTABLE_SET_DEFINITIONS.filter((definition) =>
    countMap.has(definition.id),
  ).map((definition) => {
    const selected = countMap.get(definition.id)!;

    return resolveActiveSet(
      definition,
      {
        // 같은 세트를 여러 행에 나눠 담으면 합계가 상한을 넘을 수 있어 여기서 한 번 더 자름
        count: Math.min(selected.count, definition.maxSetCount),
        totalStarForce: selected.totalStarForce,
      },
      arcaneShade,
    );
  });

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
      correctedFromArcaneShade: set.correctedFromArcaneShade,
    })),
    totalEffects,
  };
};

export const buildComparisonRows = (
  effectsA: BuildResult["totalEffects"],
  effectsB: BuildResult["totalEffects"],
): ComparisonRow[] => {
  // 양쪽 effect 를 key 기준으로 한 줄에 모음
  const mapA = new Map(effectsA.map((effect) => [effect.key, effect]));
  const mapB = new Map(effectsB.map((effect) => [effect.key, effect]));
  const keys = new Set<string>([...mapA.keys(), ...mapB.keys()]);

  return (
    Array.from(keys)
      .map((key) => {
        const effectA = mapA.get(key);
        const effectB = mapB.get(key);
        const valueA = effectA?.value ?? 0;
        const valueB = effectB?.value ?? 0;

        return {
          key,
          // 한쪽에만 있는 스탯이면 남은 쪽 표기를 씀
          label: effectA?.label ?? effectB?.label ?? key,
          unit: effectA?.unit ?? effectB?.unit ?? "%",
          valueA,
          valueB,
          delta: valueB - valueA,
        };
      })
      // 입력을 고칠 때마다 줄이 튀지 않도록 변화량이 아니라 이름 순으로 고정함
      .sort((a, b) => a.label.localeCompare(b.label, "ko"))
  );
};
