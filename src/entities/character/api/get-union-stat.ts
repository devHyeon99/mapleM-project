import { internalFetch } from "@/shared/api/internal";
import type { CharacterUnionStat } from "../model/types/union";

export async function getUnionStat(ocid: string): Promise<CharacterUnionStat> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterUnionStat>(
    `/api/character/union-stat?ocid=${encodeURIComponent(q)}`,
  );
}
