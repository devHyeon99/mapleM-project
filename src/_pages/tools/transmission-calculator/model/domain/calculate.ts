import {
  ADDITIONAL_GRADE_LABEL,
  ADDITIONAL_LINE_MULTIPLIER,
  POTENTIAL_GRADE_LABEL,
  POTENTIAL_LINE_MULTIPLIER,
  TARGET_TIERS,
  TIER_ORDER,
  TIER_STARFORCE_LIMIT,
  TIER_SUPPORTS_ADDITIONAL_POTENTIAL,
  TRANSMISSION_COST_TABLE,
} from "./data";
import type {
  AdditionalGrade,
  AdditionalLine,
  AdditionalOptionId,
  EquipmentTier,
  PotentialGrade,
  PotentialLine,
  PotentialOptionId,
  TransmissionCost,
  TransmissionCostRow,
  TransmissionResult,
  TransmissionState,
} from "./types";

const EMPTY_COST: TransmissionCost = { meso: 0, scroll: 0 };

/** 주문서는 개수라 반올림함 — 공개 표의 3줄 값이 이 방식과 일치함 */
const scaleCost = (
  cost: TransmissionCost,
  multiplier: number,
): TransmissionCost => ({
  meso: cost.meso * multiplier,
  scroll: Math.round(cost.scroll * multiplier),
});

export const parseAdditionalOption = (
  id: AdditionalOptionId,
): { grade: AdditionalGrade; lines: AdditionalLine } | null => {
  if (id === "none") return null;

  const [grade, lines] = id.split("-");
  return {
    grade: grade as AdditionalGrade,
    lines: Number(lines) as AdditionalLine,
  };
};

export const parsePotentialOption = (
  id: PotentialOptionId,
): { grade: PotentialGrade; lines: PotentialLine } | null => {
  if (id === "none") return null;

  const [grade, lines] = id.split("-");
  return {
    grade: grade as PotentialGrade,
    lines: Number(lines) as PotentialLine,
  };
};

export const getCostTable = (targetTier: EquipmentTier) =>
  TRANSMISSION_COST_TABLE[targetTier] ?? null;

/**
 * 전수되는 성수는 추출 장비가 가진 성수를 넘지 못하고,
 * 전수 장비의 상한도 넘지 못하므로 두 상한 중 낮은 쪽이 한계임
 */
export const getMaxStarforce = (
  sourceTier: EquipmentTier,
  targetTier: EquipmentTier,
) =>
  Math.min(
    TIER_STARFORCE_LIMIT[sourceTier].expanded,
    TIER_STARFORCE_LIMIT[targetTier].expanded,
  );

/** 추출 장비에 에디셔널이 있고 전수 장비도 받을 수 있어야 아랫잠을 전수함 */
export const supportsAdditionalPotential = (
  sourceTier: EquipmentTier,
  targetTier: EquipmentTier,
) =>
  TIER_SUPPORTS_ADDITIONAL_POTENTIAL[sourceTier] &&
  TIER_SUPPORTS_ADDITIONAL_POTENTIAL[targetTier];

/** 이 성수를 넘으면 양쪽 장비 모두 스타포스 확장권을 쓴 상태여야 함 */
export const getBaseMaxStarforce = (
  sourceTier: EquipmentTier,
  targetTier: EquipmentTier,
) =>
  Math.min(
    TIER_STARFORCE_LIMIT[sourceTier].base,
    TIER_STARFORCE_LIMIT[targetTier].base,
  );

/** 전수 장비가 추출 장비보다 상위 등급대일 때만 전수가 됨 */
export const canTransmit = (
  sourceTier: EquipmentTier,
  targetTier: EquipmentTier,
) => TIER_ORDER.indexOf(targetTier) > TIER_ORDER.indexOf(sourceTier);

/** 추출 장비를 고르면 그보다 상위인 전수 장비만 남음 */
export const getTargetTiers = (sourceTier: EquipmentTier) =>
  TARGET_TIERS.filter((tier) => canTransmit(sourceTier, tier));

export const getClampedStarforce = (
  sourceTier: EquipmentTier,
  targetTier: EquipmentTier,
  starforce: number,
) => {
  if (!Number.isFinite(starforce)) return 0;

  return Math.min(
    Math.max(0, Math.floor(starforce)),
    getMaxStarforce(sourceTier, targetTier),
  );
};

/** 전수 장비를 바꾸면 그 장비가 못 받는 선택이 남을 수 있어 정리함 */
export const sanitizeState = (state: TransmissionState): TransmissionState => {
  const table = getCostTable(state.targetTier);

  const keepPotential = (id: PotentialOptionId) => {
    const parsed = parsePotentialOption(id);
    return parsed && table?.potential[parsed.grade] ? id : "none";
  };

  return {
    ...state,
    starforce: getClampedStarforce(
      state.sourceTier,
      state.targetTier,
      state.starforce,
    ),
    potential: keepPotential(state.potential),
    additionalPotential: supportsAdditionalPotential(
      state.sourceTier,
      state.targetTier,
    )
      ? keepPotential(state.additionalPotential)
      : "none",
  };
};

export const calculateTransmission = (
  state: TransmissionState,
): TransmissionResult => {
  const table = getCostTable(state.targetTier);
  if (!table) return { rows: [], total: EMPTY_COST };

  const rows: TransmissionCostRow[] = [];

  const starforce = getClampedStarforce(
    state.sourceTier,
    state.targetTier,
    state.starforce,
  );
  if (starforce > 0) {
    rows.push({
      key: "starforce",
      label: "스타포스",
      detail: `${starforce}성`,
      cost: scaleCost(table.starforcePerStar, starforce),
    });
  }

  // 윗잠·아랫잠은 같은 표를 쓰고 라벨만 다름
  (
    [
      { key: "potential", label: "윗잠 (잠재능력)", id: state.potential },
      {
        key: "additionalPotential",
        label: "아랫잠 (에디셔널)",
        id: supportsAdditionalPotential(state.sourceTier, state.targetTier)
          ? state.additionalPotential
          : "none",
      },
    ] as const
  ).forEach(({ key, label, id }) => {
    const parsed = parsePotentialOption(id);
    if (!parsed) return;

    const base = table.potential[parsed.grade];
    if (!base) return;

    rows.push({
      key,
      label,
      detail: `${POTENTIAL_GRADE_LABEL[parsed.grade]} ${parsed.lines}줄`,
      cost: scaleCost(base, POTENTIAL_LINE_MULTIPLIER[parsed.lines]),
    });
  });

  const additional = parseAdditionalOption(state.additionalOption);
  if (additional) {
    rows.push({
      key: "additionalOption",
      label: "추가옵션",
      detail: `${ADDITIONAL_GRADE_LABEL[additional.grade]} ${additional.lines}줄`,
      cost: scaleCost(
        table.additionalOption[additional.grade],
        ADDITIONAL_LINE_MULTIPLIER[additional.lines],
      ),
    });
  }

  if (state.soul) {
    rows.push({
      key: "soul",
      label: "소울",
      detail: "위대한 소울",
      cost: table.soul,
    });
  }

  const total = rows.reduce<TransmissionCost>(
    (acc, row) => ({
      meso: acc.meso + row.cost.meso,
      scroll: acc.scroll + row.cost.scroll,
    }),
    EMPTY_COST,
  );

  return { rows, total };
};

/** 9자리 메소는 그대로 읽기 어려워 억 단위를 같이 보여줌 */
export const formatMesoInEok = (meso: number) =>
  `${(meso / 100_000_000).toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  })}억`;

export const formatMeso = (meso: number) => meso.toLocaleString("ko-KR");
