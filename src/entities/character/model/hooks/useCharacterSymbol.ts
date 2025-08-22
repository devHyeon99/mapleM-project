import { useQuery } from "@tanstack/react-query";
import { getCharacterSymbol } from "../../api/get-symbol";

export const useCharacterSymbol = (ocid: string | null, level: number) => {
  return useQuery({
    queryKey: ["characterSymbol", ocid, level],
    queryFn: () => getCharacterSymbol(ocid!),
    enabled: !!ocid && level >= 200,
  });
};
