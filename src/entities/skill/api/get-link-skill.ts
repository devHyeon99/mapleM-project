"use server";

import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { LinkSkillResponse } from "../model/types/link-skill";

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
