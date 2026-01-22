"use client";

import type {
  CharacterUnion,
  UnionRanking,
} from "@/entities/character/model/types";
import type { ReactNode } from "react";

import type { TabKey } from "./config";
import { ItemTab, type CharacterItemTabData } from "./tabs/ItemTab";
import { CashItemTab } from "./tabs/CashItemTab/CashItemTab";
import { HexaSkillTab } from "./tabs/HexaSkillTab/HexaSkillTab";
import { HexaStatTab } from "./tabs/HexaStatTab/HexaStatTab";
import { JewelTab } from "./tabs/JewelTab/JewelTab";
import { LinkSkillTab } from "./tabs/LinkSkillTab/LinkSkillTab";
import { SkillTab } from "./tabs/SkillTab/SkillTab";
import { StatTab } from "./tabs/StatTab/StatTab";
import { SymbolTab } from "./tabs/SymbolTab/SymbolTab";
import { UnionTab } from "./tabs/UnionTab/UnionTab";
import { VmatrixTab } from "./tabs/VmatrixTab/VmatrixTab";

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

export function CharacterDetailTabContent({
  tabKey,
  ocid,
  level,
  itemData,
  unionData,
  unionRanking,
}: CharacterDetailTabContentProps) {
  const renderTabContent = TAB_CONTENT_RENDERERS[tabKey];

  return renderTabContent({
    ocid,
    level,
    itemData,
    unionData,
    unionRanking,
  });
}
