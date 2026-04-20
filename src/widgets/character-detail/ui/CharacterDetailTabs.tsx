"use client";

import type { CharacterUnion, UnionRanking } from "@/entities/character";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { Tabs, TabsContent } from "@/shared/ui/tabs";

import { ALL_TABS, type TabKey } from "./config";
import { CharacterDetailTabContent } from "./CharacterDetailTabContent";
import { CharacterDetailTabNav } from "./CharacterDetailTabNav";
import { TabLoadingBox } from "./TabLoadingBox";
import type { CharacterItemTabData } from "./types";

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

interface CharacterDetailTabsViewProps extends CharacterDetailTabsProps {
  activeTab: TabKey;
  onTabChange: (value: string) => void;
}

const CharacterDetailTabsView = ({
  ocid,
  level,
  itemData,
  unionData,
  unionRanking,
  activeTab,
  onTabChange,
}: CharacterDetailTabsViewProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <div className="flex flex-col gap-2">
        <CharacterDetailTabNav />

        {ALL_TABS.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="rounded-2xl"
          >
            <CharacterDetailTabContent
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
  const pathname = usePathname(); // 현재 경로
  const searchParams = useSearchParams(); // 현재 query

  const tabQuery = searchParams.get(TAB_QUERY_KEY);
  const tabFromUrl = isTabKey(tabQuery) ? tabQuery : DEFAULT_TAB;
  const [activeTab, setActiveTab] = useState<TabKey>(tabFromUrl);

  // 뒤로가기·앞으로가기 등 외부 URL 변경 시 activeTab을 URL과 동기화
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

    // router.replace 는 RSC 재요청을 일으켜 페이지의 no-store 넥슨 호출까지 다시 나간다.
    // 탭은 서버 렌더 결과를 바꾸지 않으므로 URL 만 갈아끼운다.
    window.history.replaceState(null, "", href);
  };

  return (
    <CharacterDetailTabsView
      {...props}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );
};

// useSearchParams 는 가장 가까운 Suspense 경계까지를 클라이언트 렌더로 떨어뜨린다.
// 경계가 없으면 그 범위가 라우트 전체가 되므로 탭 영역만 감싼다.
const CharacterDetailTabsFallback = () => {
  return (
    <Tabs value={DEFAULT_TAB} className="w-full">
      <div className="flex flex-col gap-2">
        <CharacterDetailTabNav />
        <TabLoadingBox className="min-h-[408px] sm:min-h-[474px]" />
      </div>
    </Tabs>
  );
};

export const CharacterDetailTabs = (props: CharacterDetailTabsProps) => {
  return (
    <Suspense fallback={<CharacterDetailTabsFallback />}>
      <CharacterDetailTabsWithUrl {...props} />
    </Suspense>
  );
};
