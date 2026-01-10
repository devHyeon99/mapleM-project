"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import type { CharacterDetailData } from "@/entities/character/model/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { cn } from "@/shared/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { ALL_TABS, TabKey } from "./config";
import {
  CashItemTab,
  HexaSkillTab,
  HexaStatTab,
  ItemTab,
  JewelTab,
  LinkSkillTab,
  SkillTab,
  StatTab,
  SymbolTab,
  UnionTab,
  VmatrixTab,
} from "./tabs";

interface CharacterDetailTabsProps {
  ocid: string;
  characterData: CharacterDetailData;
}

export const CharacterDetailTabs = ({
  ocid,
  characterData,
}: CharacterDetailTabsProps) => {
  const [activeTab, setActiveTab] = React.useState<TabKey>("Item");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  const handleScroll = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const hasOverflow = scrollWidth - clientWidth > 1;

    setIsAtStart(!hasOverflow || scrollLeft <= 1);
    setIsAtEnd(
      !hasOverflow || Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerMode = () => setShowScrollButtons(mediaQuery.matches);

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    const frameId = window.requestAnimationFrame(handleScroll);

    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(element);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount =
      direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;

    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const tabContentByKey: Record<TabKey, React.ReactNode> = {
    Item: <ItemTab data={characterData} />,
    CashItem: <CashItemTab ocid={ocid} />,
    Stat: <StatTab ocid={ocid} level={characterData.character_level} />,
    Jewel: <JewelTab ocid={ocid} level={characterData.character_level} />,
    Symbol: <SymbolTab ocid={ocid} level={characterData.character_level} />,
    LinkSkill: <LinkSkillTab ocid={ocid} />,
    Skill: <SkillTab ocid={ocid} />,
    Vmatrix: <VmatrixTab ocid={ocid} level={characterData.character_level} />,
    HexaSkill: (
      <HexaSkillTab ocid={ocid} level={characterData.character_level} />
    ),
    HexaStat: <HexaStatTab ocid={ocid} level={characterData.character_level} />,
    Union: (
      <UnionTab
        ocid={ocid}
        data={characterData.union_data ?? null}
        ranking={characterData.union_ranking ?? null}
      />
    ),
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabKey)}
      className="w-full"
    >
      <div className="flex flex-col gap-2">
        {/* 네비게이션 컨테이너 (group으로 Hover 감지) */}
        <div className="group bg-card relative w-full border-b">
          {/* 좌측 플로팅 버튼 */}
          <div
            className={cn(
              "absolute top-1/2 left-2 z-10 -translate-y-1/2 transition-opacity duration-200",
              showScrollButtons ? "opacity-0" : "hidden",
              "pointer-events-none",
              !isAtStart &&
                "group-hover:pointer-events-auto group-hover:opacity-100",
            )}
          >
            <button
              onClick={() => scrollByAmount("left")}
              className="bg-background hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-colors"
              aria-label="이전 탭 보기"
            >
              <ChevronLeft className="text-muted-foreground h-5 w-5" />
            </button>
          </div>

          {/* 우측 플로팅 버튼 */}
          <div
            className={cn(
              "absolute top-1/2 right-2 z-10 -translate-y-1/2 transition-opacity duration-200",
              showScrollButtons ? "opacity-0" : "hidden",
              "pointer-events-none",
              !isAtEnd &&
                "group-hover:pointer-events-auto group-hover:opacity-100",
            )}
          >
            <button
              onClick={() => scrollByAmount("right")}
              className="bg-background hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-colors"
              aria-label="다음 탭 보기"
            >
              <ChevronRight className="text-muted-foreground h-5 w-5" />
            </button>
          </div>
          <TabsList
            ref={scrollRef}
            onScroll={handleScroll}
            className={cn(
              "flex h-12 w-full items-center justify-start rounded-none bg-transparent p-0 shadow-sm",
              "overflow-x-auto overflow-y-hidden scroll-smooth whitespace-nowrap",
              "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            {ALL_TABS.map((tab) => (
              <React.Fragment key={tab.value}>
                <span id={`${tab.value}-tab-description`} className="sr-only">
                  {tab.description}
                </span>
                <TabsTrigger
                  value={tab.value}
                  aria-describedby={`${tab.value}-tab-description`}
                  className={cn(
                    "text-muted-foreground relative h-12 shrink-0 rounded-none border-0 border-b-2 px-5 text-sm font-semibold shadow-none!",
                    "hover:text-foreground! hover:cursor-pointer",
                    "data-[state=active]:text-foreground data-[state=active]:border-orange-500 data-[state=active]:bg-transparent! dark:data-[state=active]:border-b-orange-500",
                  )}
                >
                  {tab.mobileLabel}
                </TabsTrigger>
              </React.Fragment>
            ))}
          </TabsList>
        </div>

        {/* 탭 콘텐츠 영역 */}
        {ALL_TABS.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            aria-label={tab.description}
            className="rounded-xs focus-visible:outline-none"
          >
            {tabContentByKey[tab.value]}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
};
