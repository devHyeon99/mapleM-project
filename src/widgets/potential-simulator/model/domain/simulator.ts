import {
  TWO_LINE_PROBABILITY,
  getHeartOptionPool,
  getOptionPoolByLevel,
} from "./data";
import type {
  EquipmentCategory,
  EquipmentLevel,
  FlameType,
  HeartGrade,
  OptionDefinition,
  OptionPool,
  RolledOption,
  SimulationResult,
} from "./types";

type SimulatorInput = {
  flameType: FlameType;
  equipmentCategory: EquipmentCategory;
  equipmentLevel: EquipmentLevel | null;
  heartGrade: HeartGrade;
  // 강력한 환생의 불꽃 2줄 고정 상태를 강제로 반영할 때 사용
  forceTwoLines?: boolean;
};

// min~max 범위의 정수 난수를 생성
function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// step(예: 0.1, 0.001)을 정수 연산으로 다루기 위한 스케일 값을 계산
function getScaleByStep(step: number) {
  if (Number.isInteger(step)) return 1;
  const decimalPart = step.toString().split(".")[1] ?? "";
  return Math.pow(10, decimalPart.length);
}

// 옵션 값 MIN~MAX 사이를 step 간격으로 균등 샘플링
function sampleValue(min: number, max: number, step: number) {
  const scale = getScaleByStep(step);
  const minTick = Math.round(min * scale);
  const maxTick = Math.round(max * scale);
  const stepTick = Math.round(step * scale);

  if (stepTick <= 0) {
    return min;
  }

  const steps = Math.floor((maxTick - minTick) / stepTick);
  const offset = getRandomIntInclusive(0, Math.max(steps, 0));
  return (minTick + offset * stepTick) / scale;
}

// 옵션 풀에서 중복 없이 count개를 무작위로 선택
function pickDistinctOptions(options: OptionDefinition[], count: number) {
  const pool = [...options];
  const selected: OptionDefinition[] = [];

  for (let idx = 0; idx < count && pool.length > 0; idx += 1) {
    const randomIndex = getRandomIntInclusive(0, pool.length - 1);
    const [picked] = pool.splice(randomIndex, 1);
    if (picked) {
      selected.push(picked);
    }
  }

  return selected;
}

// 장비 종류(기계심장/그 외)에 따라 조회할 옵션 풀을 결정
function resolvePool(input: SimulatorInput): OptionPool | null {
  if (input.equipmentCategory === "heart") {
    return getHeartOptionPool({
      flameType: input.flameType,
      grade: input.heartGrade,
    });
  }

  if (input.equipmentLevel == null) {
    return null;
  }

  return getOptionPoolByLevel({
    flameType: input.flameType,
    equipmentCategory: input.equipmentCategory,
    level: input.equipmentLevel,
  });
}

/**
 * 환생의 불꽃 1회 사용을 시뮬레이션
 * - 1~2줄 결정
 * - 옵션 종류 무작위 선택(중복 없음)
 * - 각 옵션 값을 MIN~MAX 범위에서 step 단위로 균등 샘플링
 */
export function simulateAdditionalOption(
  input: SimulatorInput,
): SimulationResult | null {
  const optionPool = resolvePool(input);
  if (!optionPool) {
    return null;
  }

  const twoLineChance = TWO_LINE_PROBABILITY[input.flameType];
  const lineCount: 1 | 2 =
    input.forceTwoLines || Math.random() < twoLineChance ? 2 : 1;
  const pickedOptions = pickDistinctOptions(optionPool.options, lineCount);

  const rolledOptions: RolledOption[] = pickedOptions
    .map((option) => {
      const range = optionPool.ranges[option.key];
      if (!range) return null;

      const value = sampleValue(range.min, range.max, option.step);
      return {
        key: option.key,
        label: option.label,
        value,
        unit: option.unit,
        step: option.step,
      };
    })
    .filter((option): option is RolledOption => option != null);

  return {
    flameType: input.flameType,
    equipmentCategory: input.equipmentCategory,
    lineCount,
    options: rolledOptions,
  };
}

// UI 출력용 포맷 함수 (step 기준 소수 자릿수 + percent 단위 처리)
export function formatRolledValue(
  value: number,
  unit: RolledOption["unit"],
  step: number,
) {
  const decimals = Number.isInteger(step)
    ? 0
    : (step.toString().split(".")[1] ?? "").length;

  const formatted = value.toFixed(decimals);
  return unit === "percent" ? `${formatted}%` : formatted;
}
