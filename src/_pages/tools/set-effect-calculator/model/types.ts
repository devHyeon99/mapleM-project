import type { EffectUnit } from "@/entities/set-effect";

export type BuildRow = {
  id: string;
  setId: string;
  count: number;
  starForce: number;
};

export type BuildState = BuildRow[];

export type ActiveSetSummary = {
  id: string;
  displayName: string;
  count: number;
  totalStarForce: number;
  /** 아케인셰이드 1종 보정으로 세트 수가 1 늘어난 상태인지 */
  correctedFromArcaneShade: boolean;
};

export type TotalEffectRow = {
  key: string;
  label: string;
  unit: EffectUnit;
  value: number;
};

export type BuildResult = {
  activeSets: ActiveSetSummary[];
  totalEffects: TotalEffectRow[];
};

/** 스탯 한 줄을 A·B·차이로 묶은 비교표 행 */
export type ComparisonRow = {
  key: string;
  label: string;
  unit: EffectUnit;
  valueA: number;
  valueB: number;
  delta: number;
};

/** 한 세팅의 편집 동작 묶음 — 카드에서 행까지 통째로 전달함 */
export type BuildHandlers = {
  onSetChange: (rowId: string, setId: string) => void;
  onCountChange: (rowId: string, count: number) => void;
  onStarForceChange: (rowId: string, value: number) => void;
  onAddRow: () => void;
  onRemoveRow: (rowId: string) => void;
  onReset: () => void;
};
