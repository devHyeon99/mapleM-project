import { useQuery } from "@tanstack/react-query";
import { getCharacterStat } from "../../api/get-stat";

export const useCharacterStat = (ocid: string | null) => {
  return useQuery({
    queryKey: ["characterStat", ocid],
    queryFn: () => getCharacterStat(ocid!),
    enabled: !!ocid,
  });
};
