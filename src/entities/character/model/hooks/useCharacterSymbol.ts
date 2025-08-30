import { useQuery } from "@tanstack/react-query";
import { getCharacterSymbol } from "../../api/get-symbol";

export const useCharacterSymbol = (ocid: string | null, level: number) => {
  return useQuery({
    queryKey: ["characterSymbol", ocid],
    queryFn: () => getCharacterSymbol(ocid!),
    enabled: !!ocid && level >= 200,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
