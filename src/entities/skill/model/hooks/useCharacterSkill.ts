import type { CharacterSkillData } from "@/entities/skill/model";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterSkill = (ocid: string | null) =>
  useCharacterApi<CharacterSkillData>({
    ocid,
    endpoint: "/api/characters/skill",
  });
