import type { Metadata } from "next";

import { ToolComingSoonCard } from "@/widgets/tools-hub/ui/ToolComingSoonCard";

export const metadata: Metadata = {
  title: "메이플스토리M 추가옵션 시뮬레이션",
  description: "추가옵션 결과를 비교하는 시뮬레이션입니다.",
  alternates: {
    canonical: "/tools/potential",
  },
};

export default function PotentialPage() {
  return (
    <section className="space-y-3">
      <h1 className="sr-only">추가옵션 시뮬레이션</h1>
      <p className="sr-only">추가옵션 결과를 계산하는 화면입니다.</p>
      <ToolComingSoonCard
        title="추가옵션 시뮬레이션"
        description="추가옵션 조합 결과를 시뮬레이션할 예정입니다."
      />
    </section>
  );
}
