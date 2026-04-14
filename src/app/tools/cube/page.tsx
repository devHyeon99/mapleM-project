import { CubeSimulator } from "@/widgets/cube-simulator";
import { buildToolMetadata } from "../_lib/tool-metadata";

export const metadata = buildToolMetadata({
  title: "메이플스토리M 큐브 시뮬레이터",
  description:
    "메이플스토리M 큐브 잠재옵션 확률표를 기준으로 큐브 시뮬레이션을 진행할 수 있습니다.",
  path: "/tools/cube",
  keywords: [
    "메이플스토리M",
    "메이플M",
    "큐브 시뮬레이션",
    "잠재옵션",
    "에디셔널 잠재옵션",
    "메이플M 큐브 확률",
  ],
  noIndex: true,
});

export default function CubePage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 큐브 시뮬레이터</h1>
        <p>
          메이플스토리M 큐브 잠재옵션 확률표를 기준으로 큐브 시뮬레이션을 진행할
          수 있습니다.
        </p>
      </header>

      <CubeSimulator />
    </section>
  );
}
