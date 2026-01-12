"use client";

import type { CharacterUnion, UnionRanking } from "@/entities/character/model/types";
import { useState } from "react";

import { Tabs, TabsContent } from "@/shared/ui/tabs";

import { ALL_TABS, type TabKey } from "./config";
import { CharacterDetailTabNav } from "./CharacterDetailTabNav";
import { CharacterDetailTabPanelResolver } from "./CharacterDetailTabPanelResolver";
import type { CharacterItemTabData } from "./tabs/ItemTab/ItemTab";

interface CharacterDetailTabsProps {
  ocid: string;
  level: number;
  itemData: CharacterItemTabData;
  unionData: CharacterUnion | null;
  unionRanking: UnionRanking | null;
}

export const CharacterDetailTabs = ({
  ocid,
  level,
  itemData,
  unionData,
  unionRanking,
}: CharacterDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>("Item");

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabKey)}
      className="w-full"
    >
      <div className="flex flex-col gap-2">
        <CharacterDetailTabNav />

        {ALL_TABS.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            aria-label={tab.description}
            className="rounded-xs focus-visible:outline-none"
          >
            <CharacterDetailTabPanelResolver
              tabKey={tab.value}
              ocid={ocid}
              level={level}
              itemData={itemData}
              unionData={unionData}
              unionRanking={unionRanking}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
