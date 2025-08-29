import type { ApiResponse } from "@/shared/model/types/ApiResponse";
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

  const res = await fetch(
    `/api/character/cash-item?ocid=${encodeURIComponent(q)}`,
    { cache: "no-store" },
  );

  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CashItemCombined>;

  if (!res.ok) {
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  }
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error("데이터가 없습니다.");

  return json.data;
}
