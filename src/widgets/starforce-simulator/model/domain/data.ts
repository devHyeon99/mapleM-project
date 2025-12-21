import type {
  LuckyDayRate,
  StarforceEquipmentCategory,
  StarforceModifierOptions,
  StarforceRate,
  StarforceRateRow,
} from "./types";

export const STARFORCE_BASE_RATE_TABLE: StarforceRateRow[] = [
  { targetStar: 1, rate: { success: 95, keep: 5, decrease: 0, destroy: 0 } },
  { targetStar: 2, rate: { success: 90, keep: 10, decrease: 0, destroy: 0 } },
  { targetStar: 3, rate: { success: 85, keep: 15, decrease: 0, destroy: 0 } },
  { targetStar: 4, rate: { success: 80, keep: 20, decrease: 0, destroy: 0 } },
  { targetStar: 5, rate: { success: 75, keep: 25, decrease: 0, destroy: 0 } },
  { targetStar: 6, rate: { success: 65, keep: 20, decrease: 15, destroy: 0 } },
  { targetStar: 7, rate: { success: 60, keep: 25, decrease: 15, destroy: 0 } },
  { targetStar: 8, rate: { success: 55, keep: 30, decrease: 15, destroy: 0 } },
  { targetStar: 9, rate: { success: 50, keep: 35, decrease: 15, destroy: 0 } },
  { targetStar: 10, rate: { success: 45, keep: 40, decrease: 15, destroy: 0 } },
  { targetStar: 11, rate: { success: 35, keep: 45, decrease: 15, destroy: 5 } },
  { targetStar: 12, rate: { success: 30, keep: 50, decrease: 15, destroy: 5 } },
  { targetStar: 13, rate: { success: 25, keep: 55, decrease: 15, destroy: 5 } },
  { targetStar: 14, rate: { success: 20, keep: 60, decrease: 15, destroy: 5 } },
  { targetStar: 15, rate: { success: 15, keep: 65, decrease: 15, destroy: 5 } },
  { targetStar: 16, rate: { success: 10, keep: 70, decrease: 15, destroy: 5 } },
  { targetStar: 17, rate: { success: 7, keep: 73, decrease: 15, destroy: 5 } },
  { targetStar: 18, rate: { success: 5, keep: 75, decrease: 15, destroy: 5 } },
  { targetStar: 19, rate: { success: 3, keep: 77, decrease: 15, destroy: 5 } },
  { targetStar: 20, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 21, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 22, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 23, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 24, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 25, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 26, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 27, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 28, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 29, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 30, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 31, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 32, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 33, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 34, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 35, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
  { targetStar: 36, rate: { success: 1, keep: 79, decrease: 15, destroy: 5 } },
];

export const STARFORCE_EQUIPMENT_CATEGORY_OPTIONS: Array<{
  type: StarforceEquipmentCategory;
  label: string;
}> = [
  { type: "genesisWeapon", label: "제네시스 무기" },
  { type: "arcaneShade", label: "아케인셰이드 장비" },
  { type: "absolabs", label: "앱솔랩스 장비" },
  { type: "rootAbyss", label: "루타비스 장비" },
];

export const DEFAULT_STARFORCE_OPTIONS: StarforceModifierOptions = {
  safetyShield: false,
  protectShield: false,
  luckyDayRate: 0,
  starCatchSuccess: true,
};

export const LUCKY_DAY_RATE_OPTIONS: LuckyDayRate[] = [3, 5, 7, 10];

export function getBaseRateByTargetStar(targetStar: number): StarforceRate {
  return (
    STARFORCE_BASE_RATE_TABLE.find((row) => row.targetStar === targetStar)
      ?.rate ?? {
      success: 0,
      keep: 0,
      decrease: 0,
      destroy: 0,
    }
  );
}

export function getMaxStarforceByCategory(
  equipmentCategory: StarforceEquipmentCategory,
) {
  if (equipmentCategory === "rootAbyss") return 31;
  return 36;
}
