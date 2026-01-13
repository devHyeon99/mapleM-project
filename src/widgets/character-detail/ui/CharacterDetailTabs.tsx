"use client";

import type {
  CharacterUnion,
  UnionRanking,
} from "@/entities/character/model/types";
import { Suspense, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsContent } from "@/shared/ui/tabs";

import { ALL_TABS, type TabKey } from "./config";
import { CharacterDetailTabNav } from "./CharacterDetailTabNav";
import { CharacterDetailTabPanelResolver } from "./CharacterDetailTabPanelResolver";
import type { CharacterItemTabData } from "./tabs/ItemTab/ItemTab";

const DEFAULT_TAB: TabKey = "Item";
const TAB_QUERY_KEY = "tab";

const isTabKey = (value: string | null): value is TabKey => {
  return value != null && ALL_TABS.some((tab) => tab.value === value);
};

interface CharacterDetailTabsProps {
  ocid: string;
  level: number;
  itemData: CharacterItemTabData;
  unionData: CharacterUnion | null;
  unionRanking: UnionRanking | null;
}

interface CharacterDetailTabsContentProps extends CharacterDetailTabsProps {
  activeTab: TabKey;
  onTabChange: (value: string) => void;
}

const CharacterDetailTabsContent = ({
  ocid,
  level,
  itemData,
  unionData,
  unionRanking,
  activeTab,
  onTabChange,
}: CharacterDetailTabsContentProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex flex-col gap-2">
        <CharacterDetailTabNav />

        {ALL_TABS.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
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

// URL query와 탭 상태를 동기화하는 컨트롤러 컴포넌트
const CharacterDetailTabsWithUrl = (props: CharacterDetailTabsProps) => {
  const router = useRouter(); // URL 변경용
  const pathname = usePathname(); // 현재 경로
  const searchParams = useSearchParams(); // 현재 query
  const [, startTransition] = useTransition();

  const tabQuery = searchParams.get(TAB_QUERY_KEY);
  const tabFromUrl = isTabKey(tabQuery) ? tabQuery : DEFAULT_TAB;
  const [activeTab, setActiveTab] = useState<TabKey>(tabFromUrl);

  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  const handleTabChange = (value: string) => {
    if (!isTabKey(value)) return;

    setActiveTab(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value === DEFAULT_TAB) {
      params.delete(TAB_QUERY_KEY);
    } else {
      params.set(TAB_QUERY_KEY, value);
    }

    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  };

  return (
    <CharacterDetailTabsContent
      {...props}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
};

export const CharacterDetailTabs = (props: CharacterDetailTabsProps) => {
  return (
    <Suspense
      fallback={
        <CharacterDetailTabsContent
          {...props}
          activeTab={DEFAULT_TAB}
          onTabChange={() => {}}
        />
      }
    >
      <CharacterDetailTabsWithUrl {...props} />
    </Suspense>
  );
};
