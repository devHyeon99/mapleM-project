import {
  ABSOLABS_SET,
  ARCANE_SHADE_SET,
  COMMANDER_LOOT_SET,
  DAWN_BOSS_SET,
  EXPEDITION_BOSS_LOOT_SET,
  MUSPELL_LEGENDARY_SET,
  MUSPELL_UNIQUE_SET,
  PENSALIR_LEGENDARY_SET,
  PENSALIR_UNIQUE_SET,
  ROOT_ABYSS_LEGENDARY_SET,
  ROOT_ABYSS_UNIQUE_SET,
  type EquipmentSetDefinition,
} from "@/entities/set-effect";

import type { BuildRow, BuildState } from "./types";

export const SELECTABLE_SET_DEFINITIONS: EquipmentSetDefinition[] = [
  ARCANE_SHADE_SET,
  ABSOLABS_SET,
  ROOT_ABYSS_LEGENDARY_SET,
  ROOT_ABYSS_UNIQUE_SET,
  PENSALIR_LEGENDARY_SET,
  PENSALIR_UNIQUE_SET,
  MUSPELL_LEGENDARY_SET,
  MUSPELL_UNIQUE_SET,
  DAWN_BOSS_SET,
  COMMANDER_LOOT_SET,
  EXPEDITION_BOSS_LOOT_SET,
];

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

export const STAR_FORCE_THRESHOLDS_BY_SET_ID = new Map(
  SELECTABLE_SET_DEFINITIONS.map((definition) => [
    definition.id,
    definition.starForceEffects?.length
      ? Array.from(
          new Set(
            definition.starForceEffects.flatMap((effect) =>
              Object.keys(effect.values).map(Number),
            ),
          ),
        ).sort((a, b) => a - b)
      : [],
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
