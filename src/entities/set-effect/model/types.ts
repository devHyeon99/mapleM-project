export type EffectUnit = "%" | "flat";
export type ItemNameNormalization = "none" | "stripBracketPrefix";
export type EffectKey =
  | "accuracy"
  | "blockRate"
  | "bossAttack"
  | "bossDefense"
  | "criticalDamage"
  | "criticalDamageReduction"
  | "expRate"
  | "finalDamage"
  | "hpRecovery"
  | "ignoreDefense"
  | "jumpIncrease"
  | "magicAttack"
  | "magicDamage"
  | "magicDamageReduction"
  | "magicDefense"
  | "maxDamageIncrease"
  | "maxHp"
  | "maxMp"
  | "moveSpeedIncrease"
  | "penetrationRate"
  | "physicalAttack"
  | "physicalDamage"
  | "physicalDamageReduction"
  | "physicalDefense"
  | "stance";

export type EffectValueBySetCount = Record<number, number>;
export type EffectValueByStarForce = Record<number, number | null>;

export interface EquipmentSetItemMatcher {
  itemName?: string;
  itemNamePrefix?: string;
  itemNameSuffix?: string;
  itemSlotName?: string;
  itemPageName?: string;
  itemGrades?: readonly string[];
  equipmentLevels?: readonly number[];
}

export interface SetEffectRow {
  key: EffectKey;
  label: string;
  unit: EffectUnit;
  values: EffectValueBySetCount;
}

export interface StarForceEffectRow {
  key: EffectKey;
  label: string;
  unit: EffectUnit;
  values: EffectValueByStarForce;
}

export interface EquipmentSetDefinition {
  id: string;
  displayName: string;
  displayOrder: number;
  minSetCount: number;
  maxSetCount: number;
  nameNormalization?: ItemNameNormalization;
  itemGrades?: readonly string[];
  itemNames?: readonly string[];
  itemNamePrefixes?: readonly string[];
  itemNameSuffixes?: readonly string[];
  itemMatchers?: readonly EquipmentSetItemMatcher[];
  setEffects: SetEffectRow[];
  starForceEffects?: StarForceEffectRow[];
}

export interface ResolvedSetEffectRow {
  key: EffectKey;
  label: string;
  unit: EffectUnit;
  value: number | null;
}

export interface ActiveEquipmentSet {
  id: string;
  displayName: string;
  count: number;
  effects: ResolvedSetEffectRow[];
  totalStarForce: number;
  appliedStarForceThreshold: number | null;
  starForceEffects: ResolvedSetEffectRow[];
  combinedEffects: ResolvedSetEffectRow[];
}
