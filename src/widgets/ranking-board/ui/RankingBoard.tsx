"use client";

import { useSearchParams } from "next/navigation";
import {
  RankingFilters,
  RankingPagination,
} from "@/features/ranking-navigation";
import { readRankingHighlight } from "@/features/ranking-search";
import {
  RANKING_LABELS,
  RankingTable,
  type AnyRankingData,
  type RankingType,
} from "@/entities/ranking";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

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
  // 검색 조건은 URL 쿼리에 있다. 서버가 읽으면 라우트가 동적으로 확정되므로
  // 이미 클라이언트인 이 경계에서 읽어 표로 내려보낸다.
  const highlight = readRankingHighlight(useSearchParams());

  const hasRankingData = initialData.ranking.length > 0;
  const isSharenianRanking = type.includes("sharenian");

  return (
    <div className="flex flex-col gap-4">
      {!hasRankingData && isSharenianRanking && (
        <TabMessageSection className="text-muted-foreground mt-4 min-h-40! text-sm shadow-none">
          샤레니안 전장이 시작 전이기 때문에 데이터가 존재하지 않습니다.
        </TabMessageSection>
      )}

      {hasRankingData && (
        <RankingFilters
          date={fetchParams.date}
          type={type}
          worldName={fetchParams.worldName}
        />
      )}

      {hasRankingData && (
        <section aria-labelledby="ranking-table-title">
          <h2 id="ranking-table-title" className="sr-only">
            {fetchParams.worldName || "전체"} 월드 {RANKING_LABELS[type]} 랭킹
            목록
          </h2>
          <RankingTable
            type={type}
            data={initialData.ranking}
            currentPage={fetchParams.page}
            worldName={fetchParams.worldName}
            highlight={highlight}
          />
        </section>
      )}

      {hasRankingData && (
        <RankingPagination
          currentPage={fetchParams.page}
          totalPages={fetchParams.totalPages}
          type={type}
          worldName={fetchParams.worldName}
        />
      )}
    </div>
  );
}
