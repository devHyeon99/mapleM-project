import {
  CHALLENGER_SET,
  EQUIPMENT_SET_DEFINITIONS,
  type EquipmentSetDefinition,
} from "@/entities/set-effect";

import type { BuildRow, BuildState } from "./types";

// 도전자는 이벤트 전용이라 세트효과 계산 대상에서 뺌.
// 순서는 엔티티 정의를 그대로 따름
export const SELECTABLE_SET_DEFINITIONS: EquipmentSetDefinition[] =
  EQUIPMENT_SET_DEFINITIONS.filter(
    (definition) => definition.id !== CHALLENGER_SET.id,
  );

export const SET_BY_ID = new Map(
  SELECTABLE_SET_DEFINITIONS.map((definition) => [definition.id, definition]),
);

// 세트를 고르지 않은 상태를 나타내는 sentinel id
export const NONE_SET_ID = "none";

export const SET_OPTIONS = [
  { id: NONE_SET_ID, label: "선택 안 함" },
  ...SELECTABLE_SET_DEFINITIONS.map((definition) => ({
    id: definition.id,
    label: definition.displayName,
  })),
];

// 세트별 스타포스 강화 최고 구간 — 입력 상한으로만 쓰므로 구간 목록은 들고 있지 않음
export const MAX_STAR_FORCE_BY_SET_ID = new Map(
  SELECTABLE_SET_DEFINITIONS.map((definition) => [
    definition.id,
    Math.max(
      0,
      ...(definition.starForceEffects ?? []).flatMap((effect) =>
        Object.keys(effect.values).map(Number),
      ),
    ),
  ]),
);

// 한 세팅에 넣을 수 있는 장비 입력 행 상한
export const MAX_BUILD_ROWS = 10;

export const createInitialBuildState = (): BuildState => [
  { id: "row-1", setId: NONE_SET_ID, count: 0, starForce: 0 },
  { id: "row-2", setId: NONE_SET_ID, count: 0, starForce: 0 },
];

export const createBuildRow = (): BuildRow => ({
  id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  setId: NONE_SET_ID,
  count: 0,
  starForce: 0,
});
