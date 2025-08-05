import { CharacterSymbol } from "@/types/symbol";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterSymbol = (ocid: string | null) =>
  useCharacterApi<CharacterSymbol>({
    ocid,
    endpoint: "/api/characters/symbol",
  });
