"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ALL_TABS } from "./config";

const SCROLL_EDGE_THRESHOLD = 1;
const SCROLL_STEP_RATIO = 0.8;

type ScrollDirection = "left" | "right";

interface ScrollButtonProps {
  direction: ScrollDirection;
  label: string;
  onClick: (direction: ScrollDirection) => void;
}

const ScrollButton = ({ direction, label, onClick }: ScrollButtonProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={() => onClick(direction)}
      className="bg-background hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-colors"
      aria-label={label}
    >
      <Icon className="text-muted-foreground h-5 w-5" />
    </button>
  );
};

export function CharacterDetailTabNav() {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [canUseHoverControls, setCanUseHoverControls] = useState(false);

  const handleScroll = useCallback(() => {
    const element = tabListRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    const hasOverflow = scrollWidth - clientWidth > SCROLL_EDGE_THRESHOLD;

    setIsAtStart(!hasOverflow || scrollLeft <= SCROLL_EDGE_THRESHOLD);
    setIsAtEnd(
      !hasOverflow ||
        Math.ceil(scrollLeft + clientWidth) >=
          scrollWidth - SCROLL_EDGE_THRESHOLD,
    );
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerMode = () => setCanUseHoverControls(mediaQuery.matches);

    updatePointerMode();
    mediaQuery.addEventListener("change", updatePointerMode);

    return () => {
      mediaQuery.removeEventListener("change", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    const element = tabListRef.current;
    if (!element) return;

    const frameId = window.requestAnimationFrame(handleScroll);
    const resizeObserver = new ResizeObserver(handleScroll);

    resizeObserver.observe(element);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const scrollByAmount = (direction: ScrollDirection) => {
    if (!tabListRef.current) return;

    const { clientWidth } = tabListRef.current;
    const scrollAmount =
      direction === "left"
        ? -clientWidth * SCROLL_STEP_RATIO
        : clientWidth * SCROLL_STEP_RATIO;

    tabListRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const canScrollLeft = canUseHoverControls && !isAtStart;
  const canScrollRight = canUseHoverControls && !isAtEnd;
  const showStartHint = !canUseHoverControls && !isAtStart;
  const showEndHint = !canUseHoverControls && !isAtEnd;

  return (
    <div className="group bg-card relative w-full border-b">
      {showStartHint && (
        <div
          className="from-card pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r to-transparent"
          aria-hidden="true"
        />
      )}

      {showEndHint && (
        <div
          className="from-card pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent"
          aria-hidden="true"
        />
      )}

      {canScrollLeft && (
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 left-2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200",
            "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100",
          )}
        >
          <ScrollButton
            direction="left"
            label="이전 탭 보기"
            onClick={scrollByAmount}
          />
        </div>
      )}

      {canScrollRight && (
        <div
          className={cn(
            "pointer-events-none absolute top-1/2 right-2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200",
            "group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100",
          )}
        >
          <ScrollButton
            direction="right"
            label="다음 탭 보기"
            onClick={scrollByAmount}
          />
        </div>
      )}

      <TabsList
        ref={tabListRef}
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
  );
}
