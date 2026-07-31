import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { internalFetch } from "@/shared/api/internal";
import {
  JOB_PARAM,
  type JobRankingPage,
  type RankingType,
} from "@/entities/ranking";

// 랭킹은 하루 한 번 갱신되므로 같은 조건을 다시 조회할 이유가 없음.
// 라우트 핸들러의 s-maxage 와 같은 길이로 맞춤
const CACHE_MS = 60 * 60 * 1000;

interface JobRankingQuery {
  type: RankingType;
  worldName?: string;
  jobName: string | null;
  page: number;
}

/**
 * 직업으로 거른 랭킹 한 페이지.
 * 직업이 없으면 서버가 이미 그린 목록을 쓰면 되므로 조회 자체를 걸지 않음.
 */
export const useJobRanking = ({
  type,
  worldName,
  jobName,
  page,
}: JobRankingQuery) =>
  useQuery<JobRankingPage, Error>({
    queryKey: ["rankingByJob", type, worldName ?? "all", jobName, page],
    queryFn: () => {
      const params = new URLSearchParams({
        type,
        [JOB_PARAM]: jobName!,
        page: String(page),
      });
      if (worldName) params.set("world", worldName);

      // 라우트 핸들러가 Cache-Control 을 실어 보내므로 internalFetch 의
      // no-store 기본값을 풀어 브라우저 캐시까지 태움
      return internalFetch<JobRankingPage>(`/api/ranking/by-job?${params}`, {
        init: { cache: "default" },
      });
    },
    enabled: !!jobName,
    // 페이지를 넘기는 동안 표가 통째로 사라지지 않게 이전 페이지를 붙잡아 둠
    placeholderData: keepPreviousData,
    staleTime: CACHE_MS,
    gcTime: CACHE_MS,
  });
