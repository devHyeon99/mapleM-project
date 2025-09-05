import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterUnionRaider } from "../model/types/union";

export async function getUnionRaider(
  ocid: string,
): Promise<CharacterUnionRaider> {
  if (!ocid) {
    throw new Error("ocid가 필요합니다.");
  }

  // 앞서 만든 /api/character/union-raider/route.ts 엔드포인트를 호출합니다.
  const res = await fetch(
    `/api/character/union-raider?ocid=${encodeURIComponent(ocid)}`,
    { cache: "no-store" },
  );

  // JSON 파싱 실패 시 빈 객체로 폴백하여 런타임 에러 방지
  const json = (await res
    .json()
    .catch(() => ({}))) as ApiResponse<CharacterUnionRaider>;

  // 1. HTTP 상태 코드가 성공이 아닌 경우 처리
  if (!res.ok) {
    throw new Error(
      json?.error?.message ??
        `유니온 공격대 데이터 요청 실패 (Status: ${res.status})`,
    );
  }

  // 2. 응답 데이터 내부에 에러 객체가 포함된 경우 처리
  if (json.error) {
    throw new Error(json.error.message);
  }

  // 3. 정상적인 응답이지만 데이터가 없는 경우 처리
  if (!json.data) {
    throw new Error("유니온 공격대 정보를 찾을 수 없습니다.");
  }

  return json.data;
}
