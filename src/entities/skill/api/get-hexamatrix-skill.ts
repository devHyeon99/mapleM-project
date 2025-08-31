import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterHexaMatrixSkill } from "../model";

export async function getCharacterHexaMatrixSkill(
  ocid: string,
): Promise<CharacterHexaMatrixSkill> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  const res = await fetch(
    `/api/character/hexamatrix-skill?ocid=${encodeURIComponent(q)}`,
    { cache: "no-store" },
  );

  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CharacterHexaMatrixSkill>;

  if (!res.ok) {
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  }
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error("데이터가 없습니다.");

  return json.data;
}
