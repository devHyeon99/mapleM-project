import type { Metadata } from "next";

import { ToolComingSoonCard } from "@/widgets/tools-hub/ui/ToolComingSoonCard";

export const metadata: Metadata = {
  title: "메이플스토리M 큐브 시뮬레이션",
  description: "큐브 결과와 기대값을 계산하는 시뮬레이션입니다.",
  alternates: {
    canonical: "/tools/cube",
  },
};

export default function CubePage() {
  return (
    <section className="space-y-3">
      <h2 className="sr-only">큐브 시뮬레이션</h2>
      <p className="sr-only">큐브 결과와 기대값을 계산하는 화면입니다.</p>
      <ToolComingSoonCard
        title="큐브 시뮬레이션"
        description="큐브 결과 확률과 기대값을 계산할 예정입니다."
      />
    </section>
  );
}
