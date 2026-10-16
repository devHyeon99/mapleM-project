import { useQuery } from "@tanstack/react-query";
import type { CharacterUnionStat } from "../types/union";
import { getUnionStat } from "../../api/get-union-stat";

/**
 * 캐릭터의 유니온 스탯 정보를 가져오는 커스텀 훅
 * @param ocid 캐릭터 식별자
 * @param unionLevel 유니온 레벨 (유니온 미개방 캐릭터 호출 방지용)
 */
export const useUnionStat = (
  ocid: string | null,
  unionLevel: number | null,
) => {
  return useQuery<CharacterUnionStat, Error>({
    queryKey: ["unionStat", ocid],
    queryFn: () => getUnionStat(ocid!),
    enabled: !!ocid && unionLevel !== null && unionLevel > 0,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
