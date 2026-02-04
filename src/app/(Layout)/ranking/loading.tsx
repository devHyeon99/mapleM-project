import { RankingTabs } from "@/features/ranking-navigation";
import { RankingBoardSkeleton } from "@/widgets/ranking-board";

export default function RankingLoading() {
  return (
    <div className="flex w-full items-center justify-center pb-4">
      <section className="wide:px-0 w-full">
        <nav aria-label="랭킹 유형 선택">
          <RankingTabs />
        </nav>
        <RankingBoardSkeleton />
      </section>
    </div>
  );
}
