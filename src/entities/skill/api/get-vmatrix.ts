import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterVMatrix } from "@/entities/skill/model";

export async function getCharacterVmatrix(
  ocid: string,
): Promise<CharacterVMatrix> {
  const q = ocid?.trim();
  if (!q) throw new Error("ocid가 필요합니다.");

  const res = await fetch(
    `/api/character/vmatrix?ocid=${encodeURIComponent(q)}`,
  );

  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CharacterVMatrix>;

  if (!res.ok) {
    throw new Error(json?.error?.message ?? `API 요청 실패: ${res.status}`);
  }
  if (json.error) throw new Error(json.error.message);
  if (!json.data) throw new Error("데이터가 없습니다.");

  return json.data;
}
