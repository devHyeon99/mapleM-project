import { RankingTabs } from "@/features/ranking-navigation";

// /ranking 과 /ranking/[type] 이 공유하는 레이아웃.
// 탭을 레이아웃에 두어 타입 전환 시에도 유지되고,
// loading/error 경계는 탭 아래 보드 영역만 담당한다.
export default function RankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="wide:px-0 flex w-full flex-col gap-5 px-4 py-4">
      <RankingTabs />
      <div className="bg-card rounded-2xl p-4 shadow-sm">{children}</div>
    </section>
  );
}
