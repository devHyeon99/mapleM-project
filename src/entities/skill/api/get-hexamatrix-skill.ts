import { internalFetch } from "@/shared/api/internal";
import type { CharacterHexaMatrixSkill } from "../model";

export async function getCharacterHexaMatrixSkill(
  ocid: string,
): Promise<CharacterHexaMatrixSkill> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterHexaMatrixSkill>(
    `/api/character/hexamatrix-skill?ocid=${encodeURIComponent(q)}`,
  );
}
