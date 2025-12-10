import type { EffectUnit } from "@/entities/set-effect";

export type BuildRow = {
  id: string;
  setId: string;
  count: number;
  starForce: number;
};

export type BuildState = BuildRow[];

export type TotalEffectRow = {
  key: string;
  label: string;
  unit: EffectUnit;
  value: number;
};

export type BuildResult = {
  activeSets: Array<{
    id: string;
    displayName: string;
    count: number;
    totalStarForce: number;
    appliedThreshold: number | null;
  }>;
  totalEffects: TotalEffectRow[];
};

export type DiffEffectRow = {
  key: string;
  label: string;
  unit: EffectUnit;
  delta: number;
};
