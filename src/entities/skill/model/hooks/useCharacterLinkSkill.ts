import type { LinkSkillResponse } from "@/entities/skill/model";
import { useCharacterApi } from "@/shared/api/hooks/useCharacterApi";

export const useCharacterLinkSkill = (ocid: string | null) =>
  useCharacterApi<LinkSkillResponse>({
    ocid,
    endpoint: "/api/characters/link-skill",
  });
