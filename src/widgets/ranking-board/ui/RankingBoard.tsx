import {
  RankingFilters,
  RankingPagination,
} from "@/features/ranking-navigation";
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
  const hasRankingData = initialData.ranking.length > 0;
  const isSharenianRanking = type.includes("sharenian");

  return (
    <div className="flex flex-col gap-4">
      {!hasRankingData && isSharenianRanking && (
        <TabMessageSection className="text-muted-foreground mt-4 min-h-40! text-sm">
          샤레니안 전장이 시작 전이기 때문에 데이터가 존재하지 않습니다.
        </TabMessageSection>
      )}

      {hasRankingData && <RankingFilters date={fetchParams.date} />}

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
          />
        </section>
      )}

      {hasRankingData && (
        <RankingPagination
          currentPage={fetchParams.page}
          totalPages={fetchParams.totalPages}
        />
      )}
    </div>
  );
}
