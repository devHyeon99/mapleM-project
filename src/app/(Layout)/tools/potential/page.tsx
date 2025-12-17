import type { Metadata } from "next";

import { PotentialSimulator } from "@/widgets/potential-simulator";

export const metadata: Metadata = {
  title: "메이플스토리M 추가옵션 시뮬레이션",
  description: "추가옵션 결과를 비교하는 시뮬레이션입니다.",
  alternates: {
    canonical: "/tools/potential",
  },
};

export default function PotentialPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>추가옵션 시뮬레이션</h1>
        <p>환생의 불꽃을 사용한 추가옵션 결과를 시뮬레이션할 수 있습니다.</p>
      </header>

      <PotentialSimulator />
    </section>
  );
}
