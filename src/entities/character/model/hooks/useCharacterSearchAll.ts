"use client";

import { useQuery } from "@tanstack/react-query";
import { getSearchAll } from "@/entities/character/api/get-search-all";

export const useCharacterSearchAll = (name?: string) => {
  return useQuery({
    queryKey: ["characters", "all", name?.trim() || ""],
    queryFn: () => getSearchAll(name!),
    enabled: !!name?.trim(),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
