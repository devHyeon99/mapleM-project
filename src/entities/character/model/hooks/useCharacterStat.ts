import { useQuery } from "@tanstack/react-query";
import { getCharacterStat } from "../../api/get-stat";

export const useCharacterStat = (ocid: string | null, level: number) => {
  return useQuery({
    queryKey: ["characterStat", ocid, level],
    queryFn: () => getCharacterStat(ocid!, level),
    enabled: !!ocid,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
