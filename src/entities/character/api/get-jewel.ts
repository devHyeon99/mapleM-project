"use server";

import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { CharacterJewelEquipment } from "../model/types/jewel";

export async function getCharacterJewel(
  ocid: string,
): Promise<CharacterJewelEquipment> {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    const data = await nexonFetch<CharacterJewelEquipment>(
      `/character/jewel?ocid=${ocid}`,
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
