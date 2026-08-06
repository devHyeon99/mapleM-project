import { HelpCard, SIMULATOR_DISCLAIMER } from "@/shared/ui/HelpCard";

const PROBABILITY_URL =
  "https://m.nexon.com/probability/5782?language=ko&theme=";

const SECTIONS = [
  {
    title: "옵션 효과",
    items: [
      "스타캐치(성공 +5%), 럭키데이(선택 수치만큼 성공 증가), 세이프티(하락 방지), 프로텍트(파괴 방지)",
    ],
  },
  {
    title: "시뮬레이터 이용 안내",
    items: [SIMULATOR_DISCLAIMER],
  },
];

export function StarforceSimulatorHelpCard() {
  return (
    <HelpCard
      title="스타포스 시뮬레이터 도움말"
      sections={SECTIONS}
      probabilityUrl={PROBABILITY_URL}
    />
  );
}
