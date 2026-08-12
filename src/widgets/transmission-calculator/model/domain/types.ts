/** 전수 계산에 쓰는 장비 등급대 */
export type EquipmentTier =
  | "pensalir"
  | "rootAbyss"
  | "absolabs"
  | "arcaneShade";

export type PotentialGrade = "epic" | "unique" | "legendary";
export type PotentialLine = 2 | 3;
/** "none" 또는 "등급-줄수" 조합 */
export type PotentialOptionId = "none" | `${PotentialGrade}-${PotentialLine}`;

export type AdditionalGrade = "epic" | "unique";
export type AdditionalLine = 1 | 2;
export type AdditionalOptionId = "none" | `${AdditionalGrade}-${AdditionalLine}`;

export type TransmissionCost = {
  meso: number;
  scroll: number;
};

/** 등급대별 스타포스 상한 */
export type StarforceLimit = {
  /** 확장권을 쓰지 않은 상한 */
  base: number;
  /** 확장권까지 쓴 상한 */
  expanded: number;
};

/** 전수 장비(받는 쪽) 기준 비용표 */
export type TransmissionCostTable = {
  /** 1성당 비용 — 공개 표가 성수에 정비례함 */
  starforcePerStar: TransmissionCost;
  /** 잠재 2줄 기준 비용. 3줄은 배율로 계산함. 못 받는 등급은 비워 둠 */
  potential: Partial<Record<PotentialGrade, TransmissionCost>>;
  /** 추가옵션 2줄 기준 비용. 1줄은 배율로 계산함 */
  additionalOption: Record<AdditionalGrade, TransmissionCost>;
  /** 위대한 소울 기준 */
  soul: TransmissionCost;
};

export type TransmissionState = {
  sourceTier: EquipmentTier;
  targetTier: EquipmentTier;
  /** 0 이면 전수 항목에서 제외 */
  starforce: number;
  potential: PotentialOptionId;
  additionalPotential: PotentialOptionId;
  additionalOption: AdditionalOptionId;
  soul: boolean;
};

export type TransmissionCostRow = {
  key: string;
  label: string;
  detail: string;
  cost: TransmissionCost;
};

export type TransmissionResult = {
  rows: TransmissionCostRow[];
  total: TransmissionCost;
};
