import { CharacterHexaMatrix } from "@/types/HexaSkill";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterHexaSkill = (ocid: string | null) =>
  useCharacterApi<CharacterHexaMatrix>({
    ocid,
    endpoint: "/api/characters/hexa-skill",
  });
