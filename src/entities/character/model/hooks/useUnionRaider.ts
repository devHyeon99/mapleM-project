import { useQuery } from "@tanstack/react-query";
import type { CharacterUnionRaider } from "../types/union";
import { getUnionRaider } from "../../api/get-union-raider";

/**
 * 캐릭터의 유니온 공격대(Raider) 상세 정보를 가져오는 커스텀 훅
 * @param ocid 캐릭터 식별자
 * @param unionLevel 유니온 레벨 (데이터 존재 여부 확인용)
 */
export const useUnionRaider = (
  ocid: string | null,
  unionLevel: number | null,
) => {
  return useQuery<CharacterUnionRaider, Error>({
    // 쿼리 키 일관성 유지
    queryKey: ["unionRaider", ocid],

    // API 호출 함수 (get-union-raider.ts에서 정의한 함수)
    queryFn: () => getUnionRaider(ocid!),

    /**
     * 실행 조건 검토:
     * 1. ocid가 존재해야 함
     * 2. 유니온 레벨이 0보다 커야 함 (유니온이 개방되지 않은 캐릭터는 호출 방지)
     */
    enabled: !!ocid && unionLevel !== null && unionLevel > 0,

    // 캐싱 전략 일관성 유지 (10분)
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
