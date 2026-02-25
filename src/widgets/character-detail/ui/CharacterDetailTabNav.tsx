"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ALL_TABS } from "./config";

const SCROLL_STEP_RATIO = 0.8;

interface ScrollButtonProps {
  direction: "left" | "right";
  label: string;
  visible: boolean;
  onClick: () => void;
}

const ScrollButton = ({ direction, label, visible, onClick }: ScrollButtonProps) => {
  if (!visible) return null;

  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        direction === "left" ? "left-2" : "right-2",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="bg-background/60 hover:bg-background/90 flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-colors backdrop-blur-sm"
        aria-label={label}
      >
        <Icon className="text-muted-foreground h-5 w-5" />
      </button>
    </div>
  );
};

export function CharacterDetailTabNav() {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = tabListRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = tabListRef.current;
      if (!el) return;

      el.scrollBy({
        left: (direction === "left" ? -1 : 1) * el.clientWidth * SCROLL_STEP_RATIO,
        behavior: "smooth",
      });

      let lastScrollLeft = el.scrollLeft;
      const poll = () => {
        updateScrollState();
        if (el.scrollLeft !== lastScrollLeft) {
          lastScrollLeft = el.scrollLeft;
          requestAnimationFrame(poll);
        }
      };
      requestAnimationFrame(poll);
    },
    [updateScrollState],
  );

  return (
    <div className="group bg-card relative w-full border-b">
      <ScrollButton direction="left" label="이전 탭 보기" visible={canScrollLeft} onClick={() => scroll("left")} />
      <ScrollButton direction="right" label="다음 탭 보기" visible={canScrollRight} onClick={() => scroll("right")} />

      <TabsList
        ref={tabListRef}
        className={cn(
          "group-data-horizontal/tabs:h-12 flex w-full items-center justify-start rounded-none bg-transparent p-0 shadow-sm",
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
              {tab.label}
            </TabsTrigger>
          </React.Fragment>
        ))}
      </TabsList>
    </div>
  );
}
