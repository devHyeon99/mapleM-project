import { isJobName } from "@/shared/config/constants/jobs";
import {
  isSharenianRanking,
  type AnyRankingData,
  type RankingType,
} from "../model/types/ranking";

/** 월드·페이지(경로 세그먼트)와 섞이지 않도록 직업은 쿼리 파라미터로 둠 */
export const JOB_PARAM = "job";

/** 셀렉트에서 "전체 직업" 을 뜻하는 값. 쿼리에는 실리지 않음 */
export const ALL_JOB_VALUE = "all";

/**
 * 직업이 걸렸을 때만 쓰는 페이지 파라미터.
 *
 * 페이지가 경로 세그먼트(`/all/5`)면 넘길 때마다 라우트 세그먼트가 바뀌어
 * 랭킹 보드가 통째로 리마운트됨. 그러면 `keepPreviousData` 가 붙잡을 이전 목록이
 * 사라져 매번 스켈레톤이 깜빡이고, 서버는 쓰지도 않을 미필터 랭킹을 다시 긁음.
 * 쿼리로 옮기면 경로가 1페이지 정적 문서에 고정돼 둘 다 없어짐.
 */
export const PAGE_PARAM = "page";

/** 직업으로 거르지 않는 랭킹 페이지. 업적, 유니온, 길드 관련 랭킹*/
const JOB_FILTER_EXCLUDED: ReadonlySet<RankingType> = new Set([
  "achievement",
  "union",
]);

export const isJobFilterable = (type: RankingType): boolean =>
  !JOB_FILTER_EXCLUDED.has(type) && !isSharenianRanking(type);

/**
 * URL 파라미터에서 유효한 직업만 뽑음. 목록에 없는 값이면 null 이라 넥슨 데이터를 훑지 않음.
 * 클라이언트의 `useSearchParams()` 와 라우트 핸들러의 `new URL(req.url).searchParams`
 * 가 같은 타입이라 검증을 한 함수로 끝냄.
 */
export const readRankingJob = (params: URLSearchParams): string | null => {
  const job = params.get(JOB_PARAM)?.trim();
  return job && isJobName(job) ? job : null;
};

/**
 * 쿼리에 실린 페이지. 없거나 형태가 어긋나면 null 이라 호출부가 경로 세그먼트로 되돌아감.
 * 앞자리 0·소수점을 막는 규칙은 경로 세그먼트 쪽(`parseRankingFilters`)과 같음.
 */
export const readRankingPage = (params: URLSearchParams): number | null => {
  const page = params.get(PAGE_PARAM);
  return page && /^[1-9][0-9]*$/.test(page) ? Number(page) : null;
};

export const isJobRow = (row: AnyRankingData, jobName: string): boolean =>
  "character_class" in row && row.character_class === jobName;

/** 직업으로 거른 랭킹 한 페이지. 총 페이지 수가 원본과 달라 같이 실어 보냄 */
export interface JobRankingPage {
  ranking: AnyRankingData[];
  page: number;
  totalPages: number;
}
