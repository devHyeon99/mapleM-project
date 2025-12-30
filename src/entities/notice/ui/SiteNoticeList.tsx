"use client";

import { useEffect, useState } from "react";
import type { SiteNoticeItem } from "../model/types";
import { Badge } from "@/shared/ui/badge";

interface SiteNoticeListProps {
  items: SiteNoticeItem[];
}

const ROTATE_MS = 10000;

export function SiteNoticeList({ items }: SiteNoticeListProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) {
    return (
      <section className="bg-card text-card-foreground w-full rounded-xs px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="sr-only">사이트 공지</h2>
          <p className="text-muted-foreground text-sm font-medium">
            등록된 공지사항이 없습니다.
          </p>
        </div>
      </section>
    );
  }

  const current = items[index % items.length];

  return (
    <section className="bg-card text-card-foreground w-full rounded-xs px-6 py-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="sr-only">사이트 공지</h2>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 text-sm font-medium md:flex-row md:items-center md:text-base">
            <Badge>{current.title}</Badge>
            <p className="text-primary text-wrap">{current.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
