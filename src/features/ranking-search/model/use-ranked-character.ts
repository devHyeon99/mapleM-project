import { useQuery } from "@tanstack/react-query";
import { internalFetch } from "@/shared/api/internal";
import type { RankingType } from "@/entities/ranking";
import {
  FIND_TYPE_PARAM,
  rankingSearchParams,
  type RankingSearchQuery,
} from "./params";
import type { RankingSearchResult } from "./types";

// ocid 도 랭킹도 하루 한 번 바뀌는 값이라 같은 검색어를 다시 조회할 이유가 없다.
const CACHE_MS = 10 * 60 * 1000;

export const useRankedCharacter = (
  type: RankingType,
  query: RankingSearchQuery | null,
) =>
  useQuery<RankingSearchResult, Error>({
    queryKey: ["rankingSearch", type, query?.world, query?.name],
    queryFn: () =>
      internalFetch<RankingSearchResult>(
        `/api/ranking/find?${rankingSearchParams(query!)}&${FIND_TYPE_PARAM}=${type}`,
      ),
    enabled: !!query,
    staleTime: CACHE_MS,
    gcTime: CACHE_MS,
  });
