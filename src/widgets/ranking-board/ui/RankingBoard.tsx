import { RankingTabs } from "@/entities/ranking/ui/RankingTabs";
import { RankingFilters } from "@/entities/ranking/ui/RankingFilters";
import { RankingTable } from "@/entities/ranking/ui/RankingTable";
import { RankingPagination } from "@/entities/ranking/ui/RankingPagination";
import type {
  AnyRankingData,
  RankingType,
} from "@/entities/ranking/model/types/ranking";
import { RANKING_LABELS } from "@/entities/ranking/model/constants";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";

interface RankingBoardProps {
  type: RankingType;
  initialData: { ranking: AnyRankingData[] };
  fetchParams: {
    worldName?: string;
    date?: string;
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
    <div className="flex flex-col">
      <nav aria-label="랭킹 유형 선택">
        <RankingTabs />
      </nav>

      {!hasRankingData && isSharenianRanking && (
        <TabMessageSection className="text-muted-foreground mt-4 min-h-40! text-sm">
          샤레니안 전장이 시작 전이기 때문에 데이터가 존재하지 않습니다.
        </TabMessageSection>
      )}

      {hasRankingData && <RankingFilters />}

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
