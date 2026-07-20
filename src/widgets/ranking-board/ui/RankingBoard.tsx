"use client";

import { useSearchParams } from "next/navigation";
import {
  RankingFilters,
  RankingPagination,
  useJobRanking,
} from "@/features/ranking-navigation";
import { readRankingHighlight } from "@/features/ranking-search";
import {
  isJobFilterable,
  isSharenianRanking,
  RANKING_LABELS,
  RankingTable,
  readRankingJob,
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
  const jobQuery = useJobRanking({
    type,
    worldName: fetchParams.worldName,
    jobName,
    page: fetchParams.page,
  });

  const jobPage = jobName ? jobQuery.data : undefined;
  const rows = jobName ? (jobPage?.ranking ?? []) : initialData.ranking;

  const hasRankingData = initialData.ranking.length > 0;
  const isSharenian = isSharenianRanking(type);

  return (
    <div className="flex flex-col gap-4">
      {!hasRankingData && isSharenian && (
        <TabMessageSection className="text-muted-foreground mt-4 min-h-40! text-sm shadow-none">
          샤레니안 전장이 시작 전이기 때문에 데이터가 존재하지 않습니다.
        </TabMessageSection>
      )}

      {hasRankingData && (
        <>
          <RankingFilters
            date={fetchParams.date}
            type={type}
            worldName={fetchParams.worldName}
          />

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
            currentPage={jobPage?.page ?? fetchParams.page}
            totalPages={jobPage?.totalPages ?? fetchParams.totalPages}
            type={type}
            worldName={fetchParams.worldName}
          />
        </>
      )}
    </div>
  );
}
