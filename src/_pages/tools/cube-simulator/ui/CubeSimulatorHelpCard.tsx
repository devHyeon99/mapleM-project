import { HelpCard, SIMULATOR_DISCLAIMER } from "@/shared/ui/HelpCard";

const PROBABILITY_URL =
  "https://m.nexon.com/probability?client_id=NTQwMzgzODAz&language=ko";

const SECTIONS = [
  {
    title: "옵션 부여 안내",
    items: [
      "제네시스 무기는 장비 레벨 200에 해당하는 잠재능력이 부여됩니다.",
      "루타비스 장비는 레벨 160에 해당하는 잠재능력이 부여됩니다.",
    ],
  },
  {
    title: "시뮬레이터 이용 안내",
    items: [SIMULATOR_DISCLAIMER],
  },
];

export function CubeSimulatorHelpCard() {
  return (
    <HelpCard
      title="큐브 시뮬레이터 도움말"
      sections={SECTIONS}
      probabilityUrl={PROBABILITY_URL}
    />
  );
}
