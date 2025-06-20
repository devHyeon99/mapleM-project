import { CharacterSymbol } from "@/types/symbol";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterSymbol = (ocid: string | null) =>
  useCharacterApi<CharacterSymbol>({
    ocid,
    endpoint: "/api/characters/symbol",
  });
