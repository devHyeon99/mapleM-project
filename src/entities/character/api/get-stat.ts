import { internalFetch } from "@/shared/api/internal";
import type { CharacterStatContainer } from "../model/types/stat";
import type { CharacterHyperStat } from "../model/types/hyper-stat";

export interface CharacterStatData {
  stat: CharacterStatContainer;
  hyperStat: CharacterHyperStat | null;
}

export async function getCharacterStat(
  ocid: string,
  level: number = 0,
): Promise<CharacterStatData> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  const safeLevel = Number.isFinite(level) ? level : 0;

  return internalFetch<CharacterStatData>(
    `/api/character/stat?ocid=${encodeURIComponent(q)}&level=${encodeURIComponent(String(safeLevel))}`,
  );
}
