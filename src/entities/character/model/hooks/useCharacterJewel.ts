import { useQuery } from "@tanstack/react-query";
import { getCharacterJewel } from "../../api/get-jewel";

export const useCharacterJewel = (ocid: string | null, level: number) => {
  return useQuery({
    queryKey: ["characterJewel", ocid, level],
    queryFn: () => getCharacterJewel(ocid!),
    enabled: !!ocid && level >= 100,
  });
};
