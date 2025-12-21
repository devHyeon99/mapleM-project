import type { Metadata } from "next";

import { StarforceSimulator } from "@/widgets/starforce-simulator";

export const metadata: Metadata = {
  title: "메이플스토리M 스타포스 강화 시뮬레이션",
  description: "스타포스 강화 비용과 결과를 시뮬레이션하는 도구입니다.",
  alternates: {
    canonical: "/tools/starforce",
  },
};

export default function StarforcePage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>스타포스 강화 시뮬레이션</h1>
        <p>스타포스 강화 확률을 기반으로 결과를 시뮬레이션할 수 있습니다.</p>
      </header>

      <StarforceSimulator />
    </section>
  );
}
