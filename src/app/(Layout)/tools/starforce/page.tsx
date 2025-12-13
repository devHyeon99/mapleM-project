import type { Metadata } from "next";

import { ToolComingSoonCard } from "@/widgets/tools-hub/ui/ToolComingSoonCard";

export const metadata: Metadata = {
  title: "메이플스토리M 스타포스 강화 시뮬레이션",
  description: "스타포스 강화 비용과 결과를 시뮬레이션하는 도구입니다.",
  alternates: {
    canonical: "/tools/starforce",
  },
};

export default function StarforcePage() {
  return (
    <section className="space-y-3">
      <h1 className="sr-only">스타포스 강화 시뮬레이션</h1>
      <p className="sr-only">스타포스 강화 결과를 계산하는 화면입니다.</p>
      <ToolComingSoonCard
        title="스타포스 강화 시뮬레이션"
        description="강화 비용과 성공/파괴 결과를 시뮬레이션할 예정입니다."
      />
    </section>
  );
}
