"use client";

import { useQuery } from "@tanstack/react-query";
import { getCharacterSearchAll } from "../api/get-search-all";

export const useCharacterSearchAll = (name?: string) => {
  const trimmedName = name?.trim();

  return useQuery({
    queryKey: ["characters", "all", trimmedName ?? ""],
    queryFn: () => getCharacterSearchAll(trimmedName as string),
    enabled: !!trimmedName,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
