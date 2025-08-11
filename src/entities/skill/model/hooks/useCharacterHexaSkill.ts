import type { CharacterHexaMatrix } from "@/entities/skill/model";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterHexaSkill = (ocid: string | null) =>
  useCharacterApi<CharacterHexaMatrix>({
    ocid,
    endpoint: "/api/character/hexa-skill",
  });
