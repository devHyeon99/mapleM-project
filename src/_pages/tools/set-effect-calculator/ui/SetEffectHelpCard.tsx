import { HelpCard } from "@/shared/ui/HelpCard";

const SECTIONS = [
  {
    title: "계산 기준",
    items: [
      "세트 효과는 세트별 최소 세트 수부터 적용되며, 입력한 세트 수 이하 구간 중 가장 높은 구간의 수치가 들어갑니다.",
      "스타포스 효과는 같은 세트에 속한 장비의 스타포스 합계로 판정하고, 도달한 구간 중 가장 높은 구간의 수치가 들어갑니다.",
      "한벌옷은 스타포스가 두 배로 계산되므로 입력할 때도 두 배로 넣어 주세요.",
    ],
  },
  {
    title: "세트 보정 안내",
    items: [
      "아케인셰이드 1종은 자체 세트 효과가 켜지지 않아 앱솔랩스 1종과 스타포스에 합산됩니다. 2종부터는 보정이 풀립니다.",
      "도전자의 장비는 이벤트 전용이라 계산 대상에서 제외했습니다.",
    ],
  },
];

export function SetEffectHelpCard() {
  return <HelpCard title="세트옵션 계산기 도움말" sections={SECTIONS} />;
}
