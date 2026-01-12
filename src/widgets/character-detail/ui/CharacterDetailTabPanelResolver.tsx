"use client";

import type {
  CharacterUnion,
  UnionRanking,
} from "@/entities/character/model/types";

import type { TabKey } from "./config";
import { ItemTab, type CharacterItemTabData } from "./tabs/ItemTab/ItemTab";
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

interface CharacterDetailTabPanelResolverProps {
  tabKey: TabKey;
  ocid: string;
  level: number;
  itemData: CharacterItemTabData;
  unionData: CharacterUnion | null;
  unionRanking: UnionRanking | null;
}

export function CharacterDetailTabPanelResolver({
  tabKey,
  ocid,
  level,
  itemData,
  unionData,
  unionRanking,
}: CharacterDetailTabPanelResolverProps) {
  switch (tabKey) {
    case "Item":
      return <ItemTab data={itemData} />;
    case "CashItem":
      return <CashItemTab ocid={ocid} />;
    case "Stat":
      return <StatTab ocid={ocid} level={level} />;
    case "Jewel":
      return <JewelTab ocid={ocid} level={level} />;
    case "Symbol":
      return <SymbolTab ocid={ocid} level={level} />;
    case "LinkSkill":
      return <LinkSkillTab ocid={ocid} />;
    case "Skill":
      return <SkillTab ocid={ocid} />;
    case "Vmatrix":
      return <VmatrixTab ocid={ocid} level={level} />;
    case "HexaSkill":
      return <HexaSkillTab ocid={ocid} level={level} />;
    case "HexaStat":
      return <HexaStatTab ocid={ocid} level={level} />;
    case "Union":
      return <UnionTab ocid={ocid} data={unionData} ranking={unionRanking} />;
  }
}
