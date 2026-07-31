"use client";

import { useSearchParams } from "next/navigation";
import {
  RankingFilters,
  RankingPagination,
  useJobRanking,
} from "@/features/ranking-navigation";
import { readRankingHighlight } from "@/features/ranking-search";
import {
  canOtherWorldsHaveRanking,
  isJobFilterable,
  RANKING_LABELS,
  rankingEmptyMessage,
  RankingTable,
  readRankingJob,
  readRankingPage,
  type AnyRankingData,
  type RankingType,
} from "@/entities/ranking";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { RankingRowsSkeleton } from "./RankingBoardSkeleton";

interface RankingBoardProps {
  type: RankingType;
  initialData: { ranking: AnyRankingData[] };
  fetchParams: {
    worldName?: string;
    date: string;
    page: number;
    totalPages: number;
  };
}

export function RankingBoard({
  type,
  initialData,
  fetchParams,
}: RankingBoardProps) {
  const searchParams = useSearchParams();
  const highlight = readRankingHighlight(searchParams);

  // 넥슨 API 에 직업 파라미터가 없어 직업 랭킹만 클라이언트에서 따로 조회함
  const jobName = isJobFilterable(type) ? readRankingJob(searchParams) : null;

  // 직업이 걸리면 페이지가 쿼리에 실려 온다. 경로 세그먼트는 예전에 공유된 URL
  // (`/ranking/level/all/5?job=…`)을 위한 폴백으로만 남는다.
  const page = jobName
    ? (readRankingPage(searchParams) ?? fetchParams.page)
    : fetchParams.page;

  const jobQuery = useJobRanking({
    type,
    worldName: fetchParams.worldName,
    jobName,
    page,
  });

  const jobPage = jobName ? jobQuery.data : undefined;
  const rows = jobName ? (jobPage?.ranking ?? []) : initialData.ranking;

  const hasRankingData = initialData.ranking.length > 0;

  // 비어 있어도 월드를 바꾸면 결과가 나오는 경우에만 필터를 남김.
  // 전 월드가 똑같이 비는 상황(샤레니안 기간 밖)에서는 고를 게 없어 감춘다
  const showsFilters =
    hasRankingData || canOtherWorldsHaveRanking(type, fetchParams.worldName);

  return (
    <div className="flex flex-col gap-4">
      {/* 집계 없는 월드에 들어갔을 때 다른 월드로 빠져나갈 길을 남겨 둠 */}
      {showsFilters && (
        <RankingFilters
          date={fetchParams.date}
          type={type}
          worldName={fetchParams.worldName}
        />
      )}

      {/* 넥슨 API 가 집계 없는 월드·종류에도 빈 배열을 주므로, 비는 이유를 문구로 구분해 줌 */}
      {!hasRankingData ? (
        <TabMessageSection
          className="text-muted-foreground min-h-40! text-sm shadow-none"
          message={rankingEmptyMessage(type, fetchParams.worldName)}
        />
      ) : (
        <>
          <section aria-labelledby="ranking-table-title">
            <h2 id="ranking-table-title" className="sr-only">
              {fetchParams.worldName || "전체"} 월드 {RANKING_LABELS[type]} 랭킹
              목록
            </h2>

            {/* 직업을 막 고른 순간엔 거르기 전 목록을 그대로 두면 오해를 사므로 로딩으로 덮음 */}
            {jobName && !jobPage ? (
              jobQuery.error ? (
                <TabMessageSection error={jobQuery.error} />
              ) : (
                <RankingRowsSkeleton type={type} />
              )
            ) : rows.length === 0 ? (
              <TabMessageSection
                className="text-muted-foreground min-h-40! text-sm shadow-none"
                message={`${jobName} 랭커가 집계 범위 안에 없습니다.`}
              />
            ) : (
              <RankingTable
                type={type}
                data={rows}
                worldName={fetchParams.worldName}
                highlight={highlight}
              />
            )}
          </section>

          <RankingPagination
            currentPage={page}
            totalPages={jobPage?.totalPages ?? fetchParams.totalPages}
            type={type}
            worldName={fetchParams.worldName}
          />
        </>
      )}
    </div>
  );
}
