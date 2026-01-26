import { internalFetch } from "@/shared/api/internal";
import type { CharacterUnionRaider } from "../model/types/union";

export async function getUnionRaider(
  ocid: string,
): Promise<CharacterUnionRaider> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterUnionRaider>(
    `/api/character/union-raider?ocid=${encodeURIComponent(q)}`,
  );
}
