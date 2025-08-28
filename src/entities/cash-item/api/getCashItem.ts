"use server";

import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import type {
  CharacterCashEquipmentData,
  CharacterBeautyData,
} from "../model/types";

export async function getCashItem(ocid: string) {
  if (!ocid) throw new Error("OCID가 누락되었습니다.");

  try {
    const [cashRes, beautyRes] = await Promise.all([
      nexonFetch<CharacterCashEquipmentData>(
        `/character/cashitem-equipment?ocid=${ocid}`,
        { cache: "no-store" },
      ),
      nexonFetch<CharacterBeautyData>(
        `/character/beauty-equipment?ocid=${ocid}`,
        { cache: "no-store" },
      ),
    ]);

    return { ...cashRes, beauty_data: beautyRes };
  } catch (e) {
    handleCommonNexonError(e);
    throw e;
  }
}
