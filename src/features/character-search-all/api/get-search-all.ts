import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterOcidData } from "@/entities/character/model/types";

export async function getCharacterSearchAll(
  name: string,
): Promise<CharacterOcidData[]> {
  const q = name.trim();
  if (!q) throw new Error("name이 필요합니다.");

  const res = await fetch(
    `/api/character/search-all?name=${encodeURIComponent(q)}`,
    { cache: "no-store" },
  );

  let json: ApiResponse<CharacterOcidData[]> | null = null;
  try {
    json = (await res.json()) as ApiResponse<CharacterOcidData[]>;
  } catch {
    // JSON이 아닌 응답 대비
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      throw new Error(text || `API 요청 실패: ${res.status}`);
    }
  }

  if (!res.ok) {
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  }
  if (json?.error) throw new Error(json.error.message);

  return json?.data ?? [];
}
