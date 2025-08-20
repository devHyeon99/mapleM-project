"use server";

import { nexonFetch, handleCommonNexonError } from "@/shared/api/nexon";
import {
  CharacterCashEquipmentData,
  CharacterBeautyData,
} from "../model/types";

export async function getCashItem(ocid: string) {
  if (!ocid) {
    throw new Error("OCID가 누락되었습니다.");
  }

  try {
    // 병렬 요청 (캐시 장비 + 뷰티)
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

    return {
      ...cashRes,
      beauty_data: beautyRes,
    };
  } catch (error: unknown) {
    handleCommonNexonError(error);
    throw error;
  }
}
