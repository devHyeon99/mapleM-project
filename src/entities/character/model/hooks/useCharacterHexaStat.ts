import { CharacterHexaMatrixStat } from "@/entities/character";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterHexaStat = (ocid: string | null) =>
  useCharacterApi<CharacterHexaMatrixStat>({
    ocid,
    endpoint: "/api/characters/hexa-stat",
  });
