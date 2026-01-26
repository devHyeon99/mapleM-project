import { internalFetch } from "@/shared/api/internal";
import type { CharacterHexaMatrixStat } from "../model/types";

export async function getCharacterHexaMatrixStat(
  ocid: string,
): Promise<CharacterHexaMatrixStat> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterHexaMatrixStat>(
    `/api/character/hexamatrix-stat?ocid=${encodeURIComponent(q)}`,
  );
}
