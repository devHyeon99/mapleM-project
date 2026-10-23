import { internalFetch } from "@/shared/api/internal";
import type { LinkSkillResponse } from "../model/types/link-skill";

export async function getCharacterLinkSkill(
  ocid: string,
): Promise<LinkSkillResponse> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<LinkSkillResponse>(
    `/api/character/link-skill?ocid=${encodeURIComponent(q)}`,
  );
}
