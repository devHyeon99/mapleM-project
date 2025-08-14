"use server"; //  Server Action 필수

import { getCharacterDetails } from "./get-detail";

/**
 * [Server Action] 캐릭터 상세 정보 조회
 * - 클라이언트 컴포넌트에서 직접 호출
 * - Route Handler를 거치지 않아 효율적
 */
export async function getCharacterDetailAction(ocid: string) {
  if (!ocid) {
    throw new Error("잘못된 요청입니다. (OCID 누락)");
  }

  try {
    const result = await getCharacterDetails(ocid);
    return result;
  } catch (error: unknown) {
    // TypeScript 4.0부터는 catch 변수를 unknown으로 받는 것이 권장됩니다.

    // 에러 메시지 안전하게 추출
    const errorMessage =
      error instanceof Error
        ? error.message
        : "알 수 없는 오류가 발생했습니다.";

    console.error(
      `[ServerAction Error] getCharacterDetailAction: ${errorMessage}`,
    );

    // 추출한 메시지로 새 에러 던짐
    throw new Error(errorMessage || "캐릭터 정보를 불러오는데 실패했습니다.");
  }
}
