import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterOcidData } from "../model/types/ocid";

export async function getOcidForSearch(
  world: string,
  name: string,
  baseUrl = "",
): Promise<CharacterOcidData | null> {
  const res = await fetch(
    `${baseUrl}/api/character/ocid?world=${encodeURIComponent(world)}&name=${encodeURIComponent(name)}`,
    { cache: "no-store" },
  );

  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CharacterOcidData>;

  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  if (json.error) throw new Error(json.error.message);

  return json.data ?? null;
}
