import { SetEffectCalculatorPage } from "@/widgets/set-effect-calculator";
import { buildToolMetadata } from "./_lib/tool-metadata";

export const metadata = buildToolMetadata({
  title: "메이플스토리M 도구",
  description:
    "메이플스토리M의 장비 세트 옵션 계산과 시뮬레이션 도구를 이용할 수 있습니다.",
  path: "/tools",
  keywords: [
    "메이플스토리M",
    "메이플M",
    "세트 옵션",
    "세트 효과 계산기",
    "메이플M 계산기",
    "메이플M 시뮬레이터",
  ],
});

export default function ToolsPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 도구</h1>
        <p>
          메이플스토리M의 장비 세트 옵션 계산과 시뮬레이션 도구를 이용할 수
          있습니다.
        </p>
      </header>

      <SetEffectCalculatorPage />
    </section>
  );
}
