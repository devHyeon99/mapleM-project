import { HelpCard, SIMULATOR_DISCLAIMER } from "@/shared/ui/HelpCard";

const PROBABILITY_URL =
  "https://m.nexon.com/probability/5782?language=ko&theme=";

const SECTIONS = [
  {
    title: "옵션 효과",
    items: [
      "럭키데이(선택 수치만큼 성공 증가), 세이프티(하락 방지), 프로텍트(파괴 방지)",
    ],
  },
  {
    title: "강화 확률 안내",
    items: [
      "스타캐치는 2026년 7월 30일 삭제되어 강화 확률표에 반영되었습니다. 별도 설정 없이 계산됩니다.",
      "하락은 6성, 파괴는 16성 도전부터 발생합니다. 각 주문서도 해당 성수부터 선택할 수 있습니다.",
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
