import { LinkSkillResponse } from "@/types/linkskill";
import { useCharacterApi } from "./useCharacterApi";

export const useCharacterLinkSkill = (ocid: string | null) =>
  useCharacterApi<LinkSkillResponse>({
    ocid,
    endpoint: "/api/characters/link-skill",
  });
