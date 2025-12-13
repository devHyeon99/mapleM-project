import type { CubeType, PotentialMode } from "./types";
import type { PotentialTier } from "./potential-types";

export const CUBE_TYPE_LABELS: Record<CubeType, string> = {
  red: "레드 큐브",
  black: "블랙 큐브",
  additional: "에디셔널 큐브",
  whiteAdditional: "화이트 에디셔널 큐브",
};

export const POTENTIAL_TIER_LABELS: Record<PotentialTier, string> = {
  rare: "레어",
  epic: "에픽",
  unique: "유니크",
  legendary: "레전더리",
};

export const CUBE_TYPE_OPTIONS = Object.entries(CUBE_TYPE_LABELS).map(
  ([value, label]) => ({ value, label }),
);

export const STANDARD_CUBE_TYPE_OPTIONS = CUBE_TYPE_OPTIONS.filter(
  (option) => option.value === "red" || option.value === "black",
);
export const ADDITIONAL_CUBE_TYPE_OPTIONS = CUBE_TYPE_OPTIONS.filter(
  (option) => option.value === "additional" || option.value === "whiteAdditional",
);

export const POTENTIAL_TIER_OPTIONS = Object.entries(
  POTENTIAL_TIER_LABELS,
).map(([value, label]) => ({ value, label }));

export const POTENTIAL_MODE_LABELS: Record<PotentialMode, string> = {
  potential: "잠재능력",
  additional: "에디셔널 잠재능력",
};

export const POTENTIAL_MODE_OPTIONS = Object.entries(
  POTENTIAL_MODE_LABELS,
).map(([value, label]) => ({ value, label }));

export const TIER_UP_CHANCE_BY_CUBE: Record<CubeType, number> = {
  red: 0.01,
  black: 0.02,
  additional: 0.01,
  whiteAdditional: 0.02,
};
