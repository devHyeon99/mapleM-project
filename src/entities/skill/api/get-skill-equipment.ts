"use server";

import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { CharacterSkillData } from "../model/types/skill-equipment";

export async function getCharacterSkillEquipment(
  ocid: string,
): Promise<CharacterSkillData> {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    const data = await nexonFetch<CharacterSkillData>(
      `/character/skill-equipment?ocid=${ocid}`,
      {
        cache: "no-store",
      },
    );

    return data;
  } catch (error: unknown) {
    handleCommonNexonError(error);
    throw error;
  }
}
