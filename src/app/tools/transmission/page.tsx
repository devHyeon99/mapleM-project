import { TransmissionCalculator } from "@/widgets/transmission-calculator";
import { ToolJsonLd } from "../_lib/ToolJsonLd";
import { buildToolMetadata } from "../_lib/tool-metadata";

const TOOL_NAME = "메이플스토리M 장비 전수 계산기";
const TOOL_PATH = "/tools/transmission";
const TOOL_DESCRIPTION =
  "메이플스토리M 장비 전수에 필요한 메소와 전수 주문서 수량을 옵션별로 계산합니다.";

export const metadata = buildToolMetadata({
  title: TOOL_NAME,
  description: TOOL_DESCRIPTION,
  path: TOOL_PATH,
  keywords: [
    "메이플스토리M",
    "메이플M",
    "장비 전수",
    "전수 계산기",
    "전수 주문서",
    "능력 이전",
    "앱솔랩스 전수",
    "아케인셰이드 전수",
  ],
});

export default function TransmissionPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>{TOOL_NAME}</h1>
        <p>
          추출 장비와 전수 장비를 고르고 스타포스, 윗잠, 아랫잠, 추가옵션,
          소울 중 전수할 옵션을 선택하면 필요한 메소와 전수 주문서 수량을
          계산합니다.
        </p>
      </header>

      <TransmissionCalculator />

      <ToolJsonLd
        name={TOOL_NAME}
        description={TOOL_DESCRIPTION}
        path={TOOL_PATH}
      />
    </section>
  );
}
