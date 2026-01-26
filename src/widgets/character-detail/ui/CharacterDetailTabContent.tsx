import type { CharacterUnion, UnionRanking } from "@/entities/character";
import type { ReactNode } from "react";

import type { TabKey } from "./config";
import type { CharacterItemTabData } from "./types";
import {
  ItemTab,
  CashItemTab,
  HexaSkillTab,
  HexaStatTab,
  JewelTab,
  LinkSkillTab,
  SkillTab,
  StatTab,
  SymbolTab,
  UnionTab,
  VmatrixTab,
} from "./tabs";

interface CharacterDetailTabContentProps {
  tabKey: TabKey;
  ocid: string;
  level: number;
  itemData: CharacterItemTabData;
  unionData: CharacterUnion | null;
  unionRanking: UnionRanking | null;
}

type TabContentRenderer = (
  props: Omit<CharacterDetailTabContentProps, "tabKey">,
) => ReactNode;

const TAB_CONTENT_RENDERERS = {
  Item: ({ itemData }) => <ItemTab data={itemData} />,
  CashItem: ({ ocid }) => <CashItemTab ocid={ocid} />,
  Stat: ({ ocid, level }) => <StatTab ocid={ocid} level={level} />,
  Jewel: ({ ocid, level }) => <JewelTab ocid={ocid} level={level} />,
  Symbol: ({ ocid, level }) => <SymbolTab ocid={ocid} level={level} />,
  LinkSkill: ({ ocid }) => <LinkSkillTab ocid={ocid} />,
  Skill: ({ ocid }) => <SkillTab ocid={ocid} />,
  Vmatrix: ({ ocid, level }) => <VmatrixTab ocid={ocid} level={level} />,
  HexaSkill: ({ ocid, level }) => <HexaSkillTab ocid={ocid} level={level} />,
  HexaStat: ({ ocid, level }) => <HexaStatTab ocid={ocid} level={level} />,
  Union: ({ ocid, unionData, unionRanking }) => (
    <UnionTab ocid={ocid} data={unionData} ranking={unionRanking} />
  ),
} satisfies Record<TabKey, TabContentRenderer>;

export const CharacterDetailTabContent = ({
  tabKey,
  ocid,
  level,
  itemData,
  unionData,
  unionRanking,
}: CharacterDetailTabContentProps) => {
  const renderTabContent = TAB_CONTENT_RENDERERS[tabKey];

  return renderTabContent({
    ocid,
    level,
    itemData,
    unionData,
    unionRanking,
  });
};
