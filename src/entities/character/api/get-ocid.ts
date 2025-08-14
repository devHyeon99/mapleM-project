import {
  nexonFetch,
  handleCommonNexonError,
  isNexonNotFoundError,
} from "@/shared/api/nexon";

interface OcidResponse {
  ocid: string;
}

/**
 * OCID 조회 함수
 * 캐릭터가 없으면 에러 대신 null을 반환
 */

export const getOcidForSearch = async (world: string, name: string) => {
  try {
    const data = await nexonFetch<OcidResponse>(
      `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`,
      { cache: "no-store" },
    );

    return {
      world_name: world,
      ocid: data.ocid,
      character_name: name,
    };
  } catch (error: unknown) {
    // 공통 에러 처리 (점검, 키 만료 등) -> 여기서 throw 됨
    handleCommonNexonError(error);

    // 비즈니스 예외 처리
    // 데이터 없음이 에러가 아니라 결과 없음(null)임
    if (isNexonNotFoundError(error)) {
      return null;
    }

    // 그 외 알 수 없는 에러
    throw error;
  }
};
