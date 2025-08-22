"use server";

import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import { CharacterSymbol } from "../model/types/symbol";

export async function getCharacterSymbol(
  ocid: string,
): Promise<CharacterSymbol> {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    const data = await nexonFetch<CharacterSymbol>(
      `/character/symbol?ocid=${ocid}`,
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
