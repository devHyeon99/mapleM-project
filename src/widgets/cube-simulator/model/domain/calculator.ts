import {
  type PotentialOption,
  type EquipmentPotentialData,
  type PotentialTier,
} from "./potential-types";
import { TIER_UP_CHANCE_BY_CUBE } from "./constants";
import type { CubeRollResult, CubeType, RolledPotentialLine } from "./types";

// 한국어 표기 숫자 포맷터(예: 1,234)
const KO_NUMBER_FORMATTER = new Intl.NumberFormat("ko-KR");

// 동일 옵션 배열에 대한 누적 가중치 계산 결과를 캐시해서 반복 연산을 줄임
const optionWeightCache = new WeakMap<
  PotentialOption[],
  { totalChance: number; cumulative: number[] }
>();

// 옵션 배열의 누적 확률 테이블을 생성/캐시
const getOptionWeights = (options: PotentialOption[]) => {
  const cached = optionWeightCache.get(options);
  if (cached) return cached;

  const cumulative: number[] = [];
  let totalChance = 0;

  for (const option of options) {
    totalChance += option.chance;
    cumulative.push(totalChance);
  }

  const weights = { totalChance, cumulative };
  optionWeightCache.set(options, weights);
  return weights;
};

// 공개된 확률표 기반으로 옵션 1개를 선택
const pickWeightedOption = (
  options: PotentialOption[],
  rng: () => number = Math.random,
) => {
  if (options.length === 0) return null;

  const { totalChance, cumulative } = getOptionWeights(options);
  if (totalChance <= 0) return options[0] ?? null;

  const threshold = rng() * totalChance;

  for (let index = 0; index < options.length; index += 1) {
    if (threshold <= cumulative[index]) {
      return options[index] ?? null;
    }
  }

  return options[options.length - 1] ?? null;
};

// 잠재 수치를 UI 표시용 문자열로 변환
export const formatPotentialValue = (option: PotentialOption) => {
  if (option.valueType === "flat") {
    return KO_NUMBER_FORMATTER.format(option.value);
  }

  return `${option.value.toFixed(2).replace(/\.?0+$/, "")}%`;
};

const TIER_ORDER: PotentialTier[] = ["rare", "epic", "unique", "legendary"];

// 현재 등급 기준을 통해 다음 등급 계산 함수
const getNextTier = (tier: PotentialTier) => {
  const index = TIER_ORDER.indexOf(tier);
  if (index < 0) return tier;
  return TIER_ORDER[Math.min(index + 1, TIER_ORDER.length - 1)];
};

// 잠재 등급업 결정 함수 (큐브 종류에 따른 확률을 기준으로 등급업 수행)
const resolveTierUpgrade = (
  tier: PotentialTier,
  cubeType: CubeType,
  rng: () => number = Math.random,
) => {
  // 최고 등급인 레전더리일 경우 그대로 기존 tier 반환
  if (tier === "legendary") return tier;
  return rng() < TIER_UP_CHANCE_BY_CUBE[cubeType] ? getNextTier(tier) : tier;
};

// 큐브 실행 함수 (큐브 1회 실행 후 결과값 반환)
export const rollPotentialCube = (
  potentialData: EquipmentPotentialData,
  tier: PotentialTier,
  cubeType: CubeType,
  rng: () => number = Math.random,
): CubeRollResult | null => {
  // 등급업 확률을 반영한 최종 등급
  const resolvedTier = resolveTierUpgrade(tier, cubeType, rng);
  // 등급업 함수를 거친뒤 해당 등급업의 잠재능력 데이터 가져옴
  const tierData = potentialData.tiers[resolvedTier];
  if (!tierData) return null;

  // 첫번째줄 / 두번째, 세번째줄 확률 표 옵션에 따라 옵션 가져오는 구간
  const first = pickWeightedOption(tierData.first, rng);
  const second = pickWeightedOption(tierData.secondary, rng);
  const third = pickWeightedOption(tierData.secondary, rng);
  if (!first || !second || !third) return null;

  const lines: RolledPotentialLine[] = [
    { slot: "first", option: first },
    { slot: "second", option: second },
    { slot: "third", option: third },
  ];

  return {
    cubeType,
    startingTier: tier,
    resolvedTier,
    lines,
  };
};
