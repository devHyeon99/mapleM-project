"use client";

import React from "react";
import { CharacterDetailData } from "@/entities/character";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import {
  ALL_TABS,
  MAIN_TABS,
  SUB_TABS,
  TAB_COMPONENTS,
  TabKey,
} from "./config";

interface CharacterDetailTabsProps {
  ocid: string;
  characterData: CharacterDetailData;
}

export const CharacterDetailTabs = ({
  ocid,
  characterData,
}: CharacterDetailTabsProps) => {
  const renderTabContent = (tabValue: TabKey) => {
    const Component = TAB_COMPONENTS[tabValue];
    if (!Component) return null;

    const commonProps = {
      ocid,
      level: characterData.character_level,
    };

    if (tabValue === "Item") {
      return <Component data={characterData} {...commonProps} />;
    }

    if (tabValue === "Union") {
      return (
        <Component
          data={characterData.union_data ?? null}
          ranking={characterData.union_ranking ?? null}
          {...commonProps}
        />
      );
    }

    return <Component {...commonProps} />;
  };

  return (
    <Tabs
      defaultValue="Item"
      className="w-full max-w-[360px] gap-3 md:max-w-100"
    >
      <TabsList className="grid h-fit w-full grid-cols-7 gap-[2px] rounded-xs border pt-1.5">
        {MAIN_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="h-fit rounded-full px-1 text-[13px]"
          >
            {tab.label}
          </TabsTrigger>
        ))}

        <div className="col-span-7 my-1" role="presentation" aria-hidden="true">
          <Separator />
        </div>

        <div
          className="col-span-7 mb-[1px] grid w-full grid-cols-4 gap-[2px]"
          role="presentation"
        >
          {SUB_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="h-fit w-full rounded-full px-1 text-[13px]"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {ALL_TABS.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="focus-visible:outline-none"
        >
          {renderTabContent(tab.value)}
        </TabsContent>
      ))}
    </Tabs>
  );
};
