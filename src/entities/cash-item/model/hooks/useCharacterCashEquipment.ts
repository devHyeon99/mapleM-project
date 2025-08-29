"use client";

import { useQuery } from "@tanstack/react-query";
import { getCashItem } from "@/entities/cash-item/api/get-cash-item";

export const useCharacterCashEquipment = (ocid: string | null) => {
  return useQuery({
    queryKey: ["cash-item", ocid],
    queryFn: () => getCashItem(ocid!),
    enabled: !!ocid,
    staleTime: 1000 * 60 * 10,
  });
};
