import { useQuery } from "@tanstack/react-query";
import { getCharacterStat } from "../../api/get-stat";

// level 파라미터 추가
export const useCharacterStat = (ocid: string | null, level: number) => {
  return useQuery({
    // queryKey에 level을 포함시켜 레벨 변경 시(그럴 일은 드물지만) 갱신되도록 함
    queryKey: ["characterStat", ocid, level],
    queryFn: () => getCharacterStat(ocid!, level),
    enabled: !!ocid,
  });
};
