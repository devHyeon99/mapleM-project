import {
  DEFAULT_STARFORCE_OPTIONS,
  getBaseRateByTargetStar,
  getMaxStarforceByCategory,
} from "./data";
import {
  type StarforceOutcome,
  type StarforceRate,
  type StarforceRateModifier,
  type StarforceSimulationInput,
  type StarforceSimulationResult,
} from "./types";

const EMPTY_RATE: StarforceRate = {
  success: 0,
  keep: 0,
  decrease: 0,
  destroy: 0,
};

function increaseSuccessRate(rate: StarforceRate, amount: number): StarforceRate {
  if (amount <= 0) return rate;

  let remaining = amount;
  let keep = rate.keep;
  let decrease = rate.decrease;
  let destroy = rate.destroy;

  const consume = (value: number) => {
    const consumed = Math.min(value, remaining);
    remaining -= consumed;
    return value - consumed;
  };

  keep = consume(keep);
  decrease = consume(decrease);
  destroy = consume(destroy);

  const applied = amount - remaining;
  return {
    success: rate.success + applied,
    keep,
    decrease,
    destroy,
  };
}

function clampRate(value: number) {
  return Math.max(0, Number(value.toFixed(4)));
}

function normalizeRate(rate: StarforceRate): StarforceRate {
  const normalized: StarforceRate = {
    success: clampRate(rate.success),
    keep: clampRate(rate.keep),
    decrease: clampRate(rate.decrease),
    destroy: clampRate(rate.destroy),
  };

  const total =
    normalized.success +
    normalized.keep +
    normalized.decrease +
    normalized.destroy;

  if (total <= 0) return EMPTY_RATE;
  if (Math.abs(total - 100) < 0.0001) return normalized;

  const scale = 100 / total;
  return {
    success: clampRate(normalized.success * scale),
    keep: clampRate(normalized.keep * scale),
    decrease: clampRate(normalized.decrease * scale),
    destroy: clampRate(normalized.destroy * scale),
  };
}

function resolveOutcomeByRate(rate: StarforceRate): StarforceOutcome {
  const roll = Math.random() * 100;

  if (roll < rate.success) return "success";
  if (roll < rate.success + rate.keep) return "keep";
  if (roll < rate.success + rate.keep + rate.decrease) return "decrease";

  return "destroy";
}

function toNextStar(currentStar: number, outcome: StarforceOutcome) {
  if (outcome === "success") return currentStar + 1;
  if (outcome === "decrease") return Math.max(currentStar - 1, 0);
  return currentStar;
}

const starforceRateModifiers: StarforceRateModifier[] = [
  // 스타캐치 활성화 시 성공 확률 +5%
  (rate, context) => {
    if (!context.options.starCatchSuccess) return rate;
    return increaseSuccessRate(rate, 5);
  },
  // 럭키데이 주문서 사용 시 선택한 수치만큼 성공 확률 증가
  (rate, context) => {
    return increaseSuccessRate(rate, context.options.luckyDayRate);
  },
  // 세이프티 쉴드 주문서 사용 시 하락 방지(하락 확률 -> 유지 확률)
  (rate, context) => {
    if (!context.options.safetyShield) return rate;
    return {
      ...rate,
      keep: rate.keep + rate.decrease,
      decrease: 0,
    };
  },
  // 프로텍트 쉴드 주문서 사용 시 파괴 방지(파괴 확률 -> 유지 확률)
  (rate, context) => {
    if (!context.options.protectShield) return rate;
    return {
      ...rate,
      keep: rate.keep + rate.destroy,
      destroy: 0,
    };
  },
];

export function resolveStarforceRate(input: StarforceSimulationInput) {
  const maxStarforce = getMaxStarforceByCategory(input.equipmentCategory);
  const targetStar = Math.min(input.currentStar + 1, maxStarforce);
  const baseRate = getBaseRateByTargetStar(targetStar);

  return normalizeRate(
    starforceRateModifiers.reduce((currentRate, modifier) => {
      return modifier(currentRate, {
        ...input,
        options: input.options ?? DEFAULT_STARFORCE_OPTIONS,
      });
    }, baseRate),
  );
}

export function simulateStarforce(
  input: StarforceSimulationInput,
): StarforceSimulationResult {
  const maxStarforce = getMaxStarforceByCategory(input.equipmentCategory);
  const targetStar = Math.min(input.currentStar + 1, maxStarforce);
  const resolvedRate = resolveStarforceRate(input);
  const outcome = resolveOutcomeByRate(resolvedRate);
  const isDestroyed = outcome === "destroy";

  return {
    targetStar,
    resolvedRate,
    outcome,
    nextStar: Math.min(toNextStar(input.currentStar, outcome), maxStarforce),
    isDestroyed,
  };
}
