"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiResponse } from "@/types/common";

interface Options {
  ocid: string | null;
  endpoint: string;
  staleTime?: number;
  gcTime?: number;
}

export function useCharacterApi<T>({
  ocid,
  endpoint,
  staleTime = 1000 * 60 * 10,
  gcTime = 1000 * 60 * 15,
}: Options): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey: [endpoint, ocid],
    queryFn: async () => {
      if (!ocid) throw new Error("ocid가 필요합니다.");

      const res = await fetch(`${endpoint}?ocid=${ocid}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(
          error.error?.message || "API 요청 중 문제가 발생했습니다.",
        );
      }

      const json: ApiResponse<T> = await res.json();

      if (json.error) throw new Error(json.error.message);
      if (!json.data) throw new Error("데이터가 없습니다.");

      return json.data;
    },
    enabled: !!ocid,
    staleTime,
    gcTime,
  });
}
