import { RankingTabs } from "@/entities/ranking/ui/RankingTabs";
import { RankingFilters } from "@/entities/ranking/ui/RankingFilters";
import { RankingTable } from "@/entities/ranking/ui/RankingTable";
import { RankingPagination } from "@/entities/ranking/ui/RankingPagination";
import type { RankingType } from "@/entities/ranking/model/types/ranking";

interface RankingBoardProps {
  type: RankingType;
  fetchParams: {
    worldName?: string;
    date?: string;
    page: number;
  };
}

export function RankingBoard({ type, fetchParams }: RankingBoardProps) {
  return (
    <div className="flex flex-col gap-2">
      <RankingTabs />
      <RankingFilters />
      <RankingTable type={type} filters={fetchParams} />
      <RankingPagination />
    </div>
  );
}
