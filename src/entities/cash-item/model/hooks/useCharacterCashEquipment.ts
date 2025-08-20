import { useQuery } from "@tanstack/react-query";
import { getCashItem } from "../../api/getCashItem";

export const useCharacterCashEquipment = (ocid: string) => {
  return useQuery({
    queryKey: ["cash-equipment", ocid],
    queryFn: () => getCashItem(ocid),
    enabled: !!ocid,
    staleTime: 1000 * 60 * 10,
  });
};
