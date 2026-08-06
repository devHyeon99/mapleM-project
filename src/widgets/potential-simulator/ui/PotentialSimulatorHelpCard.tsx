import { HelpCard, SIMULATOR_DISCLAIMER } from "@/shared/ui/HelpCard";

const PROBABILITY_URL =
  "https://m.nexon.com/probability/5795?language=ko&theme=";

const SECTIONS = [
  {
    title: "옵션 부여 안내",
    items: [
      "고귀한 크리스탈의 장미, 저주받은 마도서 아이템은 장비 레벨 180에 해당하는 추가 옵션이 부여됩니다.",
      "영생의 돌 아이템은 장비 레벨 140에 해당하는 추가 옵션이 부여됩니다.",
      "제네시스 무기, 감시자의 눈 아이템은 장비 레벨 200에 해당하는 추가 옵션이 부여됩니다.",
    ],
  },
  {
    title: "장비 종류 안내",
    items: [
      "장비 종류 (방어구/공용방어구)에는 모자, 상의, 하의, 한벌옷, 장갑, 신발, 어깨, 망토, 벨트가 포함됩니다.",
    ],
  },
  {
    title: "시뮬레이터 이용 안내",
    items: [SIMULATOR_DISCLAIMER],
  },
];

export function PotentialSimulatorHelpCard() {
  return (
    <HelpCard
      title="추가옵션 시뮬레이터 도움말"
      sections={SECTIONS}
      probabilityUrl={PROBABILITY_URL}
    />
  );
}
