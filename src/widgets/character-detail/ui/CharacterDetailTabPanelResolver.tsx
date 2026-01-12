"use client";

import dynamic from "next/dynamic";

import type {
  CharacterUnion,
  UnionRanking,
} from "@/entities/character/model/types";

import type { TabKey } from "./config";
import { ItemTab, type CharacterItemTabData } from "./tabs/ItemTab/ItemTab";

const DynamicTabLoading = () => <div className="min-h-40" aria-hidden="true" />;

const CashItemTab = dynamic(
  () => import("./tabs/CashItemTab/CashItemTab").then((mod) => mod.CashItemTab),
  { loading: DynamicTabLoading },
);
const StatTab = dynamic(
  () => import("./tabs/StatTab/StatTab").then((mod) => mod.StatTab),
  { loading: DynamicTabLoading },
);
const JewelTab = dynamic(
  () => import("./tabs/JewelTab/JewelTab").then((mod) => mod.JewelTab),
  { loading: DynamicTabLoading },
);
const SymbolTab = dynamic(
  () => import("./tabs/SymbolTab/SymbolTab").then((mod) => mod.SymbolTab),
  { loading: DynamicTabLoading },
);
const LinkSkillTab = dynamic(
  () =>
    import("./tabs/LinkSkillTab/LinkSkillTab").then((mod) => mod.LinkSkillTab),
  { loading: DynamicTabLoading },
);
const SkillTab = dynamic(
  () => import("./tabs/SkillTab/SkillTab").then((mod) => mod.SkillTab),
  { loading: DynamicTabLoading },
);
const VmatrixTab = dynamic(
  () => import("./tabs/VmatrixTab/VmatrixTab").then((mod) => mod.VmatrixTab),
  { loading: DynamicTabLoading },
);
const HexaSkillTab = dynamic(
  () =>
    import("./tabs/HexaSkillTab/HexaSkillTab").then((mod) => mod.HexaSkillTab),
  { loading: DynamicTabLoading },
);
const HexaStatTab = dynamic(
  () => import("./tabs/HexaStatTab/HexaStatTab").then((mod) => mod.HexaStatTab),
  { loading: DynamicTabLoading },
);
const UnionTab = dynamic(
  () => import("./tabs/UnionTab/UnionTab").then((mod) => mod.UnionTab),
  { loading: DynamicTabLoading },
);

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
