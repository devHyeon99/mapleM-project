import { internalFetch } from "@/shared/api/internal";
import type {
  CharacterCashEquipmentData,
  CharacterBeautyData,
} from "@/entities/cash-item/model/types";

export type CashItemCombined = CharacterCashEquipmentData & {
  beauty_data: CharacterBeautyData;
};

export async function getCashItem(ocid: string): Promise<CashItemCombined> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  return internalFetch<CashItemCombined>(
    `/api/character/cash-item?ocid=${encodeURIComponent(q)}`,
  );
}
