"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { getTabScrollTarget } from "../lib/tabScroll";
import { ALL_TABS } from "./config";

interface ScrollButtonProps {
  direction: "left" | "right";
  label: string;
  visible: boolean;
  onClick: () => void;
}

/** 스크롤 여지를 알리는 그라데이션. 호버가 없는 모바일에서도 항상 보이기 위함. */
const ScrollFade = ({
  direction,
  visible,
}: Pick<ScrollButtonProps, "direction" | "visible">) => {
  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "from-card pointer-events-none absolute inset-y-0 z-10 w-10 to-transparent",
        direction === "left"
          ? "left-0 bg-linear-to-r"
          : "right-0 bg-linear-to-l",
      )}
    />
  );
};

const ScrollButton = ({
  direction,
  label,
  visible,
  onClick,
}: ScrollButtonProps) => {
  if (!visible) return null;

  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <div
      className={cn(
        // 포인터가 있는 환경에서만 노출한다. 모바일은 ScrollFade 로 안내함.
        "pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 opacity-0 transition-opacity duration-200 pointer-fine:block",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        direction === "left" ? "left-2" : "right-2",
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="bg-background/60 hover:bg-background/90 flex h-8 w-8 items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-colors"
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

  // 활성 탭이 스크롤 밖에 있으면 보이는 위치로 끌어온다. (?tab= 로 바로 진입한 경우)
  useEffect(() => {
    const activeTrigger = tabListRef.current?.querySelector(
      '[data-slot="tabs-trigger"][data-state="active"]',
    );
    activeTrigger?.scrollIntoView({ inline: "center", block: "nearest" });
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = tabListRef.current;
    if (!el) return;

    const left = getTabScrollTarget(el, direction);

    // 스크롤 중 상태 갱신은 scroll 이벤트 리스너가 처리한다.
    el.scrollTo({ left, behavior: "smooth" });
  }, []);

  return (
    <div className="group bg-card relative w-full overflow-hidden rounded-2xl shadow-sm">
      <ScrollFade direction="left" visible={canScrollLeft} />
      <ScrollFade direction="right" visible={canScrollRight} />

      <ScrollButton
        direction="left"
        label="이전 탭 보기"
        visible={canScrollLeft}
        onClick={() => scroll("left")}
      />
      <ScrollButton
        direction="right"
        label="다음 탭 보기"
        visible={canScrollRight}
        onClick={() => scroll("right")}
      />

      {/* role="tablist" 는 tab 이외의 자식을 소유할 수 없으므로 설명문은 TabsList 바깥에 둔다. */}
      {ALL_TABS.map((tab) => (
        <span
          key={tab.value}
          id={`${tab.value}-tab-description`}
          className="sr-only"
        >
          {tab.description}
        </span>
      ))}

      <TabsList
        ref={tabListRef}
        className={cn(
          "flex w-full items-center justify-start rounded-none bg-transparent p-0 shadow-sm group-data-horizontal/tabs:h-12",
          "overflow-x-auto overflow-y-hidden scroll-smooth whitespace-nowrap",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {ALL_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            aria-describedby={`${tab.value}-tab-description`}
            className={cn(
              "text-muted-foreground relative h-12 shrink-0 rounded-none border-0 px-5 text-sm font-semibold",
              "data-[state=active]:bg-transparent!",
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}
