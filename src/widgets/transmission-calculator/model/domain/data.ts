import type {
  AdditionalGrade,
  AdditionalLine,
  AdditionalOptionId,
  EquipmentTier,
  StarforceLimit,
  PotentialGrade,
  PotentialLine,
  PotentialOptionId,
  TransmissionCostTable,
  TransmissionState,
} from "./types";

/** 낮은 등급대부터 나열함. 전수는 이 순서상 위쪽으로만 가능함 */
export const TIER_ORDER: EquipmentTier[] = [
  "pensalir",
  "rootAbyss",
  "absolabs",
  "arcaneShade",
];

export const TIER_LABEL: Record<EquipmentTier, string> = {
  pensalir: "펜살리르 · 우트가르드",
  rootAbyss: "루타비스 · 파프니르",
  absolabs: "앱솔랩스",
  arcaneShade: "아케인셰이드",
};

/** 추출 장비(재료) 후보 — 최상위인 아케인셰이드는 올라갈 곳이 없어 제외함 */
export const SOURCE_TIERS: EquipmentTier[] = [
  "pensalir",
  "rootAbyss",
  "absolabs",
];

/** 전수 장비(대상) 후보 — 최하위인 펜살리르는 받을 일이 없어 제외함 */
export const TARGET_TIERS: EquipmentTier[] = [
  "rootAbyss",
  "absolabs",
  "arcaneShade",
];

/** 등급대별 스타포스 상한. 확장권 한 장이 상한을 한 단계 올림 */
export const TIER_STARFORCE_LIMIT: Record<EquipmentTier, StarforceLimit> = {
  pensalir: { base: 25, expanded: 25 },
  rootAbyss: { base: 30, expanded: 31 },
  absolabs: { base: 35, expanded: 36 },
  arcaneShade: { base: 35, expanded: 36 },
};

/**
 * 에디셔널 잠재능력을 부여할 수 있는 등급대.
 * 160제인 펜살리르와 루타비스는 부여 자체가 안 돼 주고받을 수 없음
 */
export const TIER_SUPPORTS_ADDITIONAL_POTENTIAL: Record<
  EquipmentTier,
  boolean
> = {
  pensalir: false,
  rootAbyss: false,
  absolabs: true,
  arcaneShade: true,
};

export const POTENTIAL_GRADE_LABEL: Record<PotentialGrade, string> = {
  epic: "에픽",
  unique: "유니크",
  legendary: "레전드",
};

/** 공개된 표에서 3줄 값이 2줄 값의 1.5배로 나옴 */
export const POTENTIAL_LINE_MULTIPLIER: Record<PotentialLine, number> = {
  2: 1,
  3: 1.5,
};

export const ADDITIONAL_GRADE_LABEL: Record<AdditionalGrade, string> = {
  epic: "에픽",
  unique: "유니크",
};

/** 공개된 표에서 1줄 값이 2줄 값의 절반으로 나옴 */
export const ADDITIONAL_LINE_MULTIPLIER: Record<AdditionalLine, number> = {
  1: 0.5,
  2: 1,
};

/**
 * 전수 장비(받는 쪽) 기준 비용표.
 * 루타비스는 공개된 표가 없어 아직 비어 있음
 */
export const TRANSMISSION_COST_TABLE: Partial<
  Record<EquipmentTier, TransmissionCostTable>
> = {
  rootAbyss: {
    starforcePerStar: { meso: 27_500_000, scroll: 1 },
    potential: {
      epic: { meso: 137_500_000, scroll: 5 },
      unique: { meso: 275_000_000, scroll: 10 },
    },
    additionalOption: {
      epic: { meso: 275_000_000, scroll: 10 },
      unique: { meso: 687_500_000, scroll: 25 },
    },
    soul: { meso: 687_500_000, scroll: 25 },
  },
  absolabs: {
    starforcePerStar: { meso: 30_000_000, scroll: 2 },
    potential: {
      epic: { meso: 150_000_000, scroll: 10 },
      unique: { meso: 300_000_000, scroll: 20 },
      legendary: { meso: 750_000_000, scroll: 50 },
    },
    additionalOption: {
      epic: { meso: 300_000_000, scroll: 20 },
      unique: { meso: 750_000_000, scroll: 50 },
    },
    soul: { meso: 750_000_000, scroll: 50 },
  },
  arcaneShade: {
    starforcePerStar: { meso: 45_000_000, scroll: 5 },
    potential: {
      epic: { meso: 225_000_000, scroll: 25 },
      unique: { meso: 450_000_000, scroll: 50 },
      legendary: { meso: 1_125_000_000, scroll: 125 },
    },
    additionalOption: {
      epic: { meso: 450_000_000, scroll: 50 },
      unique: { meso: 1_125_000_000, scroll: 125 },
    },
    soul: { meso: 1_125_000_000, scroll: 125 },
  },
};

/** 잠재 · 에디셔널 셀렉트 항목. 전수 장비가 받을 수 있는 등급만 남김 */
export const getPotentialOptions = (
  targetTier: EquipmentTier,
): Array<{ id: PotentialOptionId; label: string }> => {
  const grades = TRANSMISSION_COST_TABLE[targetTier]?.potential ?? {};

  return [
    { id: "none" as PotentialOptionId, label: "전수 안 함" },
    ...(["epic", "unique", "legendary"] as PotentialGrade[])
      .filter((grade) => grades[grade])
      .flatMap((grade) =>
        ([2, 3] as PotentialLine[]).map((line) => ({
          id: `${grade}-${line}` as PotentialOptionId,
          label: `${POTENTIAL_GRADE_LABEL[grade]} ${line}줄`,
        })),
      ),
  ];
};

export const ADDITIONAL_OPTIONS: Array<{
  id: AdditionalOptionId;
  label: string;
}> = [
  { id: "none", label: "전수 안 함" },
  ...(["epic", "unique"] as AdditionalGrade[]).flatMap((grade) =>
    ([1, 2] as AdditionalLine[]).map((line) => ({
      id: `${grade}-${line}` as AdditionalOptionId,
      label: `${ADDITIONAL_GRADE_LABEL[grade]} ${line}줄`,
    })),
  ),
];

export const createInitialState = (): TransmissionState => ({
  sourceTier: "absolabs",
  targetTier: "arcaneShade",
  starforce: 0,
  potential: "none",
  additionalPotential: "none",
  additionalOption: "none",
  soul: false,
});
