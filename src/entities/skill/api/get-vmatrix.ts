import { internalFetch } from "@/shared/api/internal";
import type { CharacterVMatrix } from "@/entities/skill/model";

export async function getCharacterVmatrix(
  ocid: string,
): Promise<CharacterVMatrix> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterVMatrix>(
    `/api/character/vmatrix?ocid=${encodeURIComponent(q)}`,
  );
}
