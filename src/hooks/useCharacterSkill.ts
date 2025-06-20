import { CharacterSkillData } from "@/types/skill";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterSkill = (ocid: string | null) =>
  useCharacterApi<CharacterSkillData>({
    ocid,
    endpoint: "/api/characters/skill",
  });
