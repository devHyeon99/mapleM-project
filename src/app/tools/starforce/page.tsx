import { StarforceSimulator } from "@/widgets/starforce-simulator";
import { ToolJsonLd } from "../_lib/ToolJsonLd";
import { buildToolMetadata } from "../_lib/tool-metadata";

const TOOL_NAME = "메이플스토리M 스타포스 강화 시뮬레이터";
const TOOL_PATH = "/tools/starforce";
const TOOL_DESCRIPTION =
  "메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할 수 있습니다.";

export const metadata = buildToolMetadata({
  title: TOOL_NAME,
  description: TOOL_DESCRIPTION,
  path: TOOL_PATH,
  keywords: [
    "메이플스토리M",
    "메이플M",
    "스타포스",
    "스타포스 강화",
    "강화 시뮬레이터",
    "메이플M 스타포스",
  ],
});

export default function StarforcePage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>{TOOL_NAME}</h1>
        <p>{TOOL_DESCRIPTION}</p>
      </header>

      <StarforceSimulator />

      <ToolJsonLd
        name={TOOL_NAME}
        description={TOOL_DESCRIPTION}
        path={TOOL_PATH}
      />
    </section>
  );
}
