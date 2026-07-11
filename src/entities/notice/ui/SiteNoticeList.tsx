"use client";

import { useEffect, useState } from "react";
import type { SiteNoticeItem } from "../model/types";
import { Badge } from "@/shared/ui/badge";

interface SiteNoticeListProps {
  items: SiteNoticeItem[];
  error?: string | null;
}

const ROTATE_MS = 5000;

export function SiteNoticeList({ items, error = null }: SiteNoticeListProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isRotatable = !error && items.length > 1;

  useEffect(() => {
    if (!isRotatable || isPaused || isExpanded) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isRotatable, isPaused, isExpanded, items.length]);

  if (error || items.length === 0) {
    return (
      <div className="bg-card text-card-foreground w-full rounded-xs px-6 py-4">
        <p className="text-muted-foreground text-sm font-medium">
          {error ?? "등록된 공지사항이 없습니다."}
        </p>
      </div>
    );
  }

  const current = items[index % items.length];

  return (
    <div
      className="bg-card text-card-foreground w-full overflow-hidden rounded-xs px-5 py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="min-w-0" aria-live="polite" aria-atomic="true">
        <button
          key={current.id}
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="animate-in fade-in slide-in-from-bottom-4 flex w-full min-w-0 flex-col gap-2 text-left text-sm font-medium duration-1000 md:flex-row md:items-center md:text-base"
        >
          <Badge>{current.title}</Badge>
          <p className={isExpanded ? "text-primary" : "text-primary truncate"}>
            {current.content}
          </p>
        </button>
      </div>
    </div>
  );
}
