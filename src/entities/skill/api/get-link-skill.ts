"use server";

import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import { LinkSkillResponse } from "../model/types/linkskill";

export async function getCharacterLinkSkill(
  ocid: string,
): Promise<LinkSkillResponse> {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    const data = await nexonFetch<LinkSkillResponse>(
      `/character/link-skill?ocid=${ocid}`,
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
