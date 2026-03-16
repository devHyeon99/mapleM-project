"use client";

import { useEffect, useState } from "react";
import type { SiteNoticeItem } from "../model/types";
import { Badge } from "@/shared/ui/badge";

interface SiteNoticeListProps {
  items: SiteNoticeItem[];
  error?: string | null;
}

const ROTATE_MS = 10000;

export function SiteNoticeList({ items, error = null }: SiteNoticeListProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isRotatable = !error && items.length > 1;

  useEffect(() => {
    if (!isRotatable || isPaused) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [isRotatable, isPaused, items.length]);

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
      className="bg-card text-card-foreground w-full rounded-xs border-b px-5 py-4 pt-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="min-w-0" aria-live="polite" aria-atomic="true">
        <div className="flex flex-col gap-2 text-sm font-medium md:flex-row md:items-center md:text-base">
          <Badge>{current.title}</Badge>
          <p className="text-primary text-wrap">{current.content}</p>
        </div>
      </div>
    </div>
  );
}
