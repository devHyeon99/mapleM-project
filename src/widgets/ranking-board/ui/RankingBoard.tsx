import { RankingTabs } from "@/entities/ranking/ui/RankingTabs";
import { RankingFilters } from "@/entities/ranking/ui/RankingFilters";
import { RankingTable } from "@/entities/ranking/ui/RankingTable";
import { RankingPagination } from "@/entities/ranking/ui/RankingPagination";
import type {
  AnyRankingData,
  RankingType,
} from "@/entities/ranking/model/types/ranking";

interface RankingBoardProps {
  type: RankingType;
  initialData: { ranking: AnyRankingData[] };
  fetchParams: {
    worldName?: string;
    date?: string;
    page: number;
  };
}

export function RankingBoard({
  type,
  initialData,
  fetchParams,
}: RankingBoardProps) {
  return (
    <div className="flex flex-col">
      <RankingTabs />
      <RankingFilters />
      <RankingTable
        type={type}
        data={initialData.ranking}
        currentPage={fetchParams.page}
        worldName={fetchParams.worldName}
      />
      <RankingPagination />
    </div>
  );
}
