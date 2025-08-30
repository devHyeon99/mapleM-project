import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterSymbol } from "../model/types/symbol";

export async function getCharacterSymbol(
  ocid: string,
): Promise<CharacterSymbol> {
  if (!ocid) throw new Error("ocid가 필요합니다.");

  const res = await fetch(
    `/api/character/symbol?ocid=${encodeURIComponent(ocid)}`,
    { cache: "no-store" },
  );

  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CharacterSymbol>;

  if (!res.ok) {
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  }
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error("데이터가 없습니다.");

  return json.data;
}
