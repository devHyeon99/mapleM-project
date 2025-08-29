import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterOcidData } from "@/entities/character/model/types";

export async function getSearchAll(name: string): Promise<CharacterOcidData[]> {
  const q = name?.trim();
  if (!q) throw new Error("name이 필요합니다.");

  const res = await fetch(
    `/api/character/search-all?name=${encodeURIComponent(q)}`,
  );

  const json = (await res.json().catch(() => ({}))) as ApiResponse<
    CharacterOcidData[]
  >;

  if (!res.ok) {
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  }
  if (json.error) throw new Error(json.error.message);

  return json.data ?? [];
}
