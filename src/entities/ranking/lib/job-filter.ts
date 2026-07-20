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

export const isJobRow = (row: AnyRankingData, jobName: string): boolean =>
  "character_class" in row && row.character_class === jobName;

/** 직업으로 거른 랭킹 한 페이지. 총 페이지 수가 원본과 달라 같이 실어 보냄 */
export interface JobRankingPage {
  ranking: AnyRankingData[];
  page: number;
  totalPages: number;
}
