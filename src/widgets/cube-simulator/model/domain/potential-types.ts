export type PotentialTier = "rare" | "epic" | "unique" | "legendary";
export type PotentialValueType = "percent" | "flat";

export interface PotentialOption {
  key: string;
  label: string;
  value: number;
  valueType: PotentialValueType;
  chance: number;
}

export interface PotentialTierData {
  first: PotentialOption[];
  secondary: PotentialOption[];
}

export interface EquipmentPotentialData {
  equipmentType: string;
  label: string;
  level: number;
  tiers: Record<PotentialTier, PotentialTierData>;
}

export interface EquipmentPotentialFamily {
  label: string;
  levels: Record<number, EquipmentPotentialData>;
}

export interface EquipmentLevelOption {
  level: number;
  label: string;
}

export interface PotentialDataset {
  equipmentPotentials: Record<string, EquipmentPotentialFamily>;
}
