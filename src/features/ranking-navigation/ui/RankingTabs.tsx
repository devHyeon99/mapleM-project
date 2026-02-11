"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { RANKING_LABELS, RANKING_TYPES } from "@/entities/ranking";

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
    <nav aria-label="랭킹 종류 이동" className="w-full">
      <ul className="bg-muted grid list-none grid-cols-3 gap-1 rounded-lg p-1 shadow-sm md:grid-cols-9">
        {RANKING_TYPES.map((type) => {
          const isActive = activeType === type;

          return (
            <li key={type}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-full items-center justify-center rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px]",
                  isActive && "bg-card text-foreground shadow-sm",
                )}
                href={type === "level" ? "/ranking" : `/ranking/${type}`}
                prefetch={false}
              >
                {RANKING_LABELS[type]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
