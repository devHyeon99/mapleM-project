import React from "react";
import { CharacterDetailData, CharacterUnion } from "@/entities/character";
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
  UnionTab,
} from "./tabs/index";

/**
 * 각 탭이 실제로 받을 수 있는 모든 Props의 합집합
 */
export interface TabComponentProps {
  ocid: string;
  level?: number;
  data?: CharacterDetailData | CharacterUnion | null;
}

export type TabKey =
  | "Item"
  | "CashItem"
  | "Stat"
  | "Jewel"
  | "Symbol"
  | "LinkSkill"
  | "Skill"
  | "Vmatrix"
  | "HexaSkill"
  | "HexaStat"
  | "Union";

export const MAIN_TABS: { value: TabKey; label: string }[] = [
  { value: "Item", label: "장비" },
  { value: "CashItem", label: "외형" },
  { value: "Stat", label: "스탯" },
  { value: "Jewel", label: "쥬얼" },
  { value: "Symbol", label: "심볼" },
  { value: "LinkSkill", label: "링크" },
  { value: "Skill", label: "스킬" },
];

export const SUB_TABS: { value: TabKey; label: string }[] = [
  { value: "Union", label: "유니온" },
  { value: "Vmatrix", label: "V매트릭스" },
  { value: "HexaSkill", label: "HEXA스킬" },
  { value: "HexaStat", label: "HEXA스탯" },
];

export const ALL_TABS = [...MAIN_TABS, ...SUB_TABS];

/**
 * 최적화: ComponentType 대신 ElementType을 사용하여
 * 각 컴포넌트 내부의 구체적인 Props 타입과의 충돌을 방지합니다.
 */
export const TAB_COMPONENTS: Record<TabKey, React.ElementType> = {
  Item: ItemTab,
  CashItem: CashItemTab,
  Stat: StatTab,
  Jewel: JewelTab,
  Symbol: SymbolTab,
  LinkSkill: LinkSkillTab,
  Skill: SkillTab,
  Vmatrix: VmatrixTab,
  HexaSkill: HexaSkillTab,
  HexaStat: HexaStatTab,
  Union: UnionTab,
};
