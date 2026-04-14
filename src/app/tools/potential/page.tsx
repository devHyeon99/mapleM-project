import { PotentialSimulator } from "@/widgets/potential-simulator";
import { buildToolMetadata } from "../_lib/tool-metadata";

export const metadata = buildToolMetadata({
  title: "메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터",
  description:
    "메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을 진행할 수 있습니다.",
  path: "/tools/potential",
  keywords: [
    "메이플스토리M",
    "메이플M",
    "환생의 불꽃",
    "추가옵션",
    "추옵 시뮬레이션",
    "메이플M 환생의 불꽃",
  ],
  noIndex: true,
});

export default function PotentialPage() {
  return (
    <section className="space-y-4">
      <header className="sr-only">
        <h1>메이플스토리M 환생의 불꽃 추가옵션 시뮬레이터</h1>
        <p>
          메이플스토리M 환생의 불꽃 추가옵션 확률표를 기준으로 시뮬레이션을
          진행할 수 있습니다.
        </p>
      </header>

      <PotentialSimulator />
    </section>
  );
}
