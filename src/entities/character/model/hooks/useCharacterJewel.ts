"use client";

import { useQuery } from "@tanstack/react-query";
import { getCharacterJewel } from "@/entities/character/api/get-jewel";

export const useCharacterJewel = (ocid: string | null, level: number) => {
  return useQuery({
    queryKey: ["characterJewel", ocid],
    queryFn: () => getCharacterJewel(ocid!),
    enabled: !!ocid && level >= 120,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};
