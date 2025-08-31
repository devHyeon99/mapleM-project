import {
  ItemTab,
  CashItemTab,
  JewelTab,
  SymbolTab,
  StatTab,
  LinkSkillTab,
  SkillTab,
  VmatrixTab,
  HexaSkillTab,
  HexaStatTab,
} from "./index";

// 탭 ID 타입 정의
export type TabKey =
  | "item"
  | "cashItem"
  | "stat"
  | "Jewel"
  | "Symbol"
  | "LinkSkill"
  | "Skill"
  | "Vmatrix"
  | "HexaSkill"
  | "HexaStat";

// 탭 설정 (순서 및 라벨)
export const MAIN_TABS: { value: TabKey; label: string }[] = [
  { value: "item", label: "장비" },
  { value: "cashItem", label: "외형" },
  { value: "stat", label: "스탯" },
  { value: "Jewel", label: "쥬얼" },
  { value: "Symbol", label: "심볼" },
  { value: "LinkSkill", label: "링크" },
  { value: "Skill", label: "스킬" },
];

export const SUB_TABS: { value: TabKey; label: string }[] = [
  { value: "Vmatrix", label: "V매트릭스" },
  { value: "HexaSkill", label: "HEXA스킬" },
  { value: "HexaStat", label: "HEXA스탯" },
];

export const ALL_TABS = [...MAIN_TABS, ...SUB_TABS];

// 탭 ID와 실제 컴포넌트 매핑
export const TAB_COMPONENTS = {
  item: ItemTab,
  cashItem: CashItemTab,
  stat: StatTab,
  Jewel: JewelTab,
  Symbol: SymbolTab,
  LinkSkill: LinkSkillTab,
  Skill: SkillTab,
  Vmatrix: VmatrixTab,
  HexaSkill: HexaSkillTab,
  HexaStat: HexaStatTab,
};
