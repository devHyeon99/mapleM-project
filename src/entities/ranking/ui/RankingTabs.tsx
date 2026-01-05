"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { RANKING_TYPES } from "../model/types/ranking";
import { RANKING_LABELS } from "../model/constants";

export function RankingTabs() {
  const pathname = usePathname();

  // /ranking 은 기본적으로 level 탭을 활성화한다.
  const lastSegment = pathname.split("/").pop() || "";
  const activeType = RANKING_TYPES.includes(
    lastSegment as (typeof RANKING_TYPES)[number],
  )
    ? (lastSegment as (typeof RANKING_TYPES)[number])
    : "level";

  return (
    <nav
      aria-label="랭킹 종류 이동"
      className="border-border bg-card mt-2 w-full border-b shadow-sm"
    >
      <ul className="grid list-none grid-cols-3 gap-1 md:grid-cols-9">
        {RANKING_TYPES.map((type) => (
          <li key={type}>
            <Link
              aria-current={activeType === type ? "page" : undefined}
              className={cn(
                "text-muted-foreground flex h-11 items-center justify-center border-b-2 border-transparent px-3 py-6 text-sm font-medium whitespace-nowrap transition-colors outline-none md:text-[15px]",
                "hover:border-orange-500 focus-visible:border-orange-500 focus-visible:ring-2",
                activeType === type &&
                  "text-foreground border-orange-500 hover:border-orange-500",
              )}
              href={type === "level" ? "/ranking" : `/ranking/${type}`}
              prefetch={false}
            >
              {RANKING_LABELS[type]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
