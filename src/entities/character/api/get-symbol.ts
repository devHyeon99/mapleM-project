import { internalFetch } from "@/shared/api/internal";
import type { CharacterSymbol } from "../model/types/symbol";

export async function getCharacterSymbol(
  ocid: string,
): Promise<CharacterSymbol> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterSymbol>(
    `/api/character/symbol?ocid=${encodeURIComponent(q)}`,
  );
}
