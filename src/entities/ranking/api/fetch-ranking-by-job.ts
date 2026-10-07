import "server-only";
import { unstable_cache } from "next/cache";
import {
  RANKING_API_ITEMS_PER_PAGE,
  RANKING_MAX_API_PAGE,
  RANKING_UI_ITEMS_PER_PAGE,
} from "../model/constants";
import type { RankingType } from "../model/types/ranking";
import { isJobRow, type JobRankingPage } from "../lib/job-filter";
import { fetchRankingCached } from "./fetch-ranking";

/**
 * 넥슨 랭킹 API 에는 직업 파라미터가 없음(`class`·`job`·`character_class` 모두 무시됨).
 * 그래서 직업 랭킹은 집계 대상 전체(200행 × 50페이지 = 1만 행)를 훑어 직접 거름.
 */

/** 한 번에 띄우는 넥슨 요청 수. 50개를 한꺼번에 던지지 않으려는 상한 */
export const FETCH_CONCURRENCY = 25;

/** 전체 랭킹 안에서 행의 위치. (API 페이지 - 1) * 200 + 페이지 안 인덱스 */
const toPosition = (apiPage: number, index: number) =>
  (apiPage - 1) * RANKING_API_ITEMS_PER_PAGE + index;

async function collectRankingByJob(
  type: RankingType,
  date: string,
  worldName: string | undefined,
  jobName: string,
): Promise<number[]> {
  const matched: number[] = [];

  for (
    let start = 1;
    start <= RANKING_MAX_API_PAGE;
    start += FETCH_CONCURRENCY
  ) {
    const pages = Array.from(
      {
        length: Math.min(FETCH_CONCURRENCY, RANKING_MAX_API_PAGE - start + 1),
      },
      (_, i) => start + i,
    );

    const chunks = await Promise.all(
      pages.map((page) => fetchRankingCached(type, date, worldName, page)),
    );

    chunks.forEach(({ ranking }, i) => {
      ranking.forEach((row, index) => {
        if (isJobRow(row, jobName)) matched.push(toPosition(pages[i], index));
      });
    });

    // 빈 페이지가 나왔으면 그 뒤도 전부 비어 있음. 월드 필터가 걸린 랭킹이 여기서 일찍 끝남
    if (chunks.some(({ ranking }) => ranking.length === 0)) break;
  }

  return matched;
}

/**
 * 직업으로 거른 행의 위치 목록. 1만 행 훑기를 하루 한 번으로 묶는 캐시임.
 * 행 자체는 fetchRankingCached 가 이미 캐싱하므로 위치(정수)만 저장해 ISR 쓰기를 줄임.
 * 가장 흔한 직업이 약 1,200행이라 행을 통째로 담으면 700KB 인데, 위치만 담으면 수 KB 임.
 */
const getRankingByJob = (
  type: RankingType,
  date: string,
  worldName: string | undefined,
  jobName: string,
) =>
  unstable_cache(
    () => collectRankingByJob(type, date, worldName, jobName),
    ["ranking-by-job-v2", type, date, worldName ?? "all", jobName],
    { revalidate: 86400 },
  )();

interface Args {
  type: RankingType;
  date: string;
  worldName?: string;
  jobName: string;
  page: number;
}

/** 거른 목록을 화면 페이지 크기로 자름. 총 페이지 수도 거른 결과 기준으로 다시 셈 */
export async function fetchRankingPageByJob({
  type,
  date,
  worldName,
  jobName,
  page,
}: Args): Promise<JobRankingPage> {
  const matched = await getRankingByJob(type, date, worldName, jobName);

  const totalPages = Math.max(
    1,
    Math.ceil(matched.length / RANKING_UI_ITEMS_PER_PAGE),
  );
  const uiPage = Math.min(Math.max(page, 1), totalPages);
  const offset = (uiPage - 1) * RANKING_UI_ITEMS_PER_PAGE;
  const positions = matched.slice(offset, offset + RANKING_UI_ITEMS_PER_PAGE);

  // 화면에 쓸 20행이 걸쳐 있는 API 페이지만 캐시에서 다시 읽음
  const apiPages = [
    ...new Set(
      positions.map((p) => Math.floor(p / RANKING_API_ITEMS_PER_PAGE) + 1),
    ),
  ];
  const loaded = new Map(
    await Promise.all(
      apiPages.map(
        async (apiPage) =>
          [
            apiPage,
            (await fetchRankingCached(type, date, worldName, apiPage)).ranking,
          ] as const,
      ),
    ),
  );

  return {
    // 좁혀 본 목록이라 전체 순위(91위, 123위…)를 그대로 두면 읽히지 않음. 직업 안 순위를 매겨 보냄
    ranking: positions.map((position, index) => ({
      ...loaded.get(Math.floor(position / RANKING_API_ITEMS_PER_PAGE) + 1)![
        position % RANKING_API_ITEMS_PER_PAGE
      ],
      job_ranking: offset + index + 1,
    })),
    page: uiPage,
    totalPages,
  };
}
