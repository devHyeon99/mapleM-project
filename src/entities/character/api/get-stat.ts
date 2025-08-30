import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterStatContainer } from "@/entities/character/model/types/stat";
import type { CharacterHyperStat } from "@/entities/character/model/types/hyper-stat";

export interface CharacterStatData {
  stat: CharacterStatContainer;
  hyperStat: CharacterHyperStat | null;
}

export async function getCharacterStat(
  ocid: string,
  level: number = 0,
): Promise<CharacterStatData> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  const safeLevel = Number.isFinite(level) ? level : 0;

  const res = await fetch(
    `/api/character/stat?ocid=${encodeURIComponent(q)}&level=${encodeURIComponent(String(safeLevel))}`,
    { cache: "no-store" },
  );

  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CharacterStatData>;

  if (!res.ok)
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error("데이터가 없습니다.");

  return json.data;
}
