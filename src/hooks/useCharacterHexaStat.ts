import { CharacterHexaMatrixStat } from "@/types/HexaStat";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterHexaStat = (ocid: string | null) =>
  useCharacterApi<CharacterHexaMatrixStat>({
    ocid,
    endpoint: "/api/characters/hexa-stat",
  });
