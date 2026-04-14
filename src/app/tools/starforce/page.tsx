import { StarforceSimulator } from "@/widgets/starforce-simulator";
import { buildToolMetadata } from "../_lib/tool-metadata";

export const metadata = buildToolMetadata({
  title: "메이플스토리M 스타포스 강화 시뮬레이터",
  description:
    "메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할 수 있습니다.",
  path: "/tools/starforce",
  keywords: [
    "메이플스토리M",
    "메이플M",
    "스타포스",
    "스타포스 강화",
    "강화 시뮬레이터",
    "메이플M 스타포스",
  ],
  noIndex: true,
});

export default function StarforcePage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 스타포스 강화 시뮬레이터</h1>
        <p>
          메이플스토리M 스타포스 강화 확률을 기준으로 강화 결과를 시뮬레이션 할
          수 있습니다.
        </p>
      </header>

      <StarforceSimulator />
    </section>
  );
}
