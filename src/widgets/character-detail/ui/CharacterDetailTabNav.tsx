"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ALL_TABS } from "./config";

const SCROLL_STEP_RATIO = 0.8;

type ScrollDirection = "left" | "right";

interface ScrollButtonProps {
  direction: ScrollDirection;
  label: string;
  onClick: () => void;
}

const ScrollButton = ({ direction, label, onClick }: ScrollButtonProps) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const position = direction === "left" ? "left-2" : "right-2";

  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 opacity-0 transition-opacity duration-200",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        position,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="bg-background hover:bg-muted flex h-8 w-8 items-center justify-center rounded-full border shadow-md transition-colors"
        aria-label={label}
      >
        <Icon className="text-muted-foreground h-5 w-5" />
      </button>
    </div>
  );
};

export function CharacterDetailTabNav() {
  const tabListRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setHasOverflow(el.scrollWidth > el.clientWidth + 1);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scroll = useCallback((direction: ScrollDirection) => {
    const el = tabListRef.current;
    if (!el) return;

    el.scrollBy({
      left:
        direction === "left"
          ? -el.clientWidth * SCROLL_STEP_RATIO
          : el.clientWidth * SCROLL_STEP_RATIO,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="group bg-card relative w-full border-b">
      {hasOverflow && (
        <>
          <ScrollButton
            direction="left"
            label="이전 탭 보기"
            onClick={() => scroll("left")}
          />
          <ScrollButton
            direction="right"
            label="다음 탭 보기"
            onClick={() => scroll("right")}
          />
        </>
      )}

      <TabsList
        ref={tabListRef}
        className={cn(
          "flex h-12 w-full items-center justify-start rounded-none bg-transparent p-0 shadow-sm",
          "overflow-x-auto overflow-y-hidden scroll-smooth whitespace-nowrap",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "[mask-image:linear-gradient(to_right,transparent,black_2rem,black_calc(100%-2rem),transparent)]",
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
