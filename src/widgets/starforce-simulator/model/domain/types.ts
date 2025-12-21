export type StarforceOutcome = "success" | "keep" | "decrease" | "destroy";

export type StarforceRate = {
  success: number;
  keep: number;
  decrease: number;
  destroy: number;
};

export type StarforceRateRow = {
  targetStar: number;
  rate: StarforceRate;
};

export type StarforceEquipmentCategory =
  | "rootAbyss"
  | "absolabs"
  | "arcaneShade"
  | "genesisWeapon";

export type LuckyDayRate = 0 | 3 | 5 | 7 | 10;

export type StarforceModifierOptions = {
  safetyShield: boolean;
  protectShield: boolean;
  luckyDayRate: LuckyDayRate;
  starCatchSuccess: boolean;
};

export type StarforceSimulationContext = {
  currentStar: number;
  equipmentCategory: StarforceEquipmentCategory;
  options: StarforceModifierOptions;
};

export type StarforceSimulationInput = StarforceSimulationContext;

export type StarforceSimulationResult = {
  targetStar: number;
  resolvedRate: StarforceRate;
  outcome: StarforceOutcome;
  nextStar: number;
  isDestroyed: boolean;
};

export type StarforceRateModifier = (
  rate: StarforceRate,
  context: StarforceSimulationContext,
) => StarforceRate;
