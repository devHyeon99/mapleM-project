import { SetEffectCalculator } from "@/widgets/set-effect-calculator";
import { ToolJsonLd } from "./_lib/ToolJsonLd";
import { buildToolMetadata } from "./_lib/tool-metadata";

// 도구 허브 역할은 탭 내비게이션이 맡음. 이 페이지는 세트옵션 계산기 자신으로 선언함
const TOOL_NAME = "메이플스토리M 세트옵션 계산기";
const TOOL_PATH = "/tools";
const TOOL_DESCRIPTION =
  "메이플스토리M 장비 세트옵션을 세트 수와 스타포스까지 반영해 계산하고, 두 세팅의 능력치 차이를 한눈에 비교합니다.";

export const metadata = buildToolMetadata({
  title: TOOL_NAME,
  description: TOOL_DESCRIPTION,
  path: TOOL_PATH,
  keywords: [
    "메이플스토리M",
    "메이플M",
    "세트옵션",
    "세트 효과",
    "세트 효과 계산기",
    "메이플M 세트 계산기",
    "앱솔랩스",
    "아케인셰이드",
  ],
});

export default function ToolsPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>{TOOL_NAME}</h1>
        <p>
          앱솔랩스, 아케인셰이드, 루타비스 등 장비 세트와 세트 수, 스타포스를
          입력하면 적용 중인 세트 효과와 합계 능력치를 계산합니다. 세팅 A 와 B
          를 나란히 두고 어떤 능력치가 얼마나 차이 나는지 비교할 수 있습니다.
        </p>
      </header>

      <SetEffectCalculator />

      <ToolJsonLd
        name={TOOL_NAME}
        description={TOOL_DESCRIPTION}
        path={TOOL_PATH}
      />
    </section>
  );
}
