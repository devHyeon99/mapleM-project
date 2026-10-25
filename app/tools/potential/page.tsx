import { PotentialSimulator } from "@/widgets/potential-simulator";
import { ToolJsonLd } from "../_lib/ToolJsonLd";
import { buildToolMetadata } from "../_lib/tool-metadata";

const TOOL_NAME = "메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터";
const TOOL_PATH = "/tools/potential";
const TOOL_DESCRIPTION =
  "메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을 진행할 수 있습니다.";

export const metadata = buildToolMetadata({
  title: TOOL_NAME,
  description: TOOL_DESCRIPTION,
  path: TOOL_PATH,
  keywords: [
    "메이플스토리M",
    "메이플M",
    "환생의 불꽃",
    "추가옵션",
    "추옵 시뮬레이션",
    "메이플M 환생의 불꽃",
  ],
});

export default function PotentialPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>{TOOL_NAME}</h1>
        <p>{TOOL_DESCRIPTION}</p>
      </header>

      <PotentialSimulator />

      <ToolJsonLd
        name={TOOL_NAME}
        description={TOOL_DESCRIPTION}
        path={TOOL_PATH}
      />
    </section>
  );
}
