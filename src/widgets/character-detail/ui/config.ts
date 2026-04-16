/** 프로필 카드 셸 스타일 (본체/스켈레톤 공용) */
export const PROFILE_CARD_SHELL_CLASS =
  "bg-card w-full rounded-2xl p-6 shadow-sm";

export interface TabDefinition<Value extends string = string> {
  value: Value;
  label: string;
  description: string;
}

export const MAIN_TABS = [
  {
    value: "Item",
    label: "장비",
    description: "착용 중인 장비와 세트 구성을 확인합니다.",
  },
  {
    value: "CashItem",
    label: "외형",
    description: "캐릭터의 코디와 캐시 장비 구성을 보여줍니다.",
  },
  {
    value: "Stat",
    label: "스탯",
    description: "전투력 판단에 필요한 주요 능력치를 확인합니다.",
  },
  {
    value: "Jewel",
    label: "쥬얼",
    description: "장착한 쥬얼과 색상 조합 효과를 확인합니다.",
  },
  {
    value: "Symbol",
    label: "심볼",
    description: "아케인 심볼과 성장 상태를 확인합니다.",
  },
  {
    value: "Skill",
    label: "스킬",
    description: "프리셋과 스킬 구성을 한 번에 살펴봅니다.",
  },
  {
    value: "LinkSkill",
    label: "링크",
    description: "보유 중인 링크 스킬과 총합 효과를 정리합니다.",
  },
] as const satisfies readonly TabDefinition[];

export const SUB_TABS = [
  {
    value: "Union",
    label: "유니온",
    description: "유니온 레벨, 배치, 효과를 확인합니다.",
  },
  {
    value: "Vmatrix",
    label: "V매트릭스",
    description: "V 코어 구성과 강화 상태를 확인합니다.",
  },
  {
    value: "HexaSkill",
    label: "HEXA스킬",
    description: "HEXA 스킬 해금 및 강화 현황을 확인합니다.",
  },
  {
    value: "HexaStat",
    label: "HEXA스탯",
    description: "HEXA 스탯 배분과 강화 상태를 확인합니다.",
  },
] as const satisfies readonly TabDefinition[];

export const ALL_TABS = [...MAIN_TABS, ...SUB_TABS] as const;

export type TabKey = (typeof ALL_TABS)[number]["value"];
