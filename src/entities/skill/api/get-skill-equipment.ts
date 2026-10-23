import { internalFetch } from "@/shared/api/internal";
import type { CharacterSkillData } from "../model/types/skill-equipment";

export async function getCharacterSkillEquipment(
  ocid: string,
): Promise<CharacterSkillData> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CharacterSkillData>(
    `/api/character/skill-equipment?ocid=${encodeURIComponent(q)}`,
  );
}
