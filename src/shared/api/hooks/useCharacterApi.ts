"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiResponse } from "@/shared/model/types";

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

      const baseUrl =
        typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL : "";

      const res = await fetch(`${baseUrl}${endpoint}?ocid=${ocid}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error?.message || `API 요청 실패: ${res.status}`);
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
