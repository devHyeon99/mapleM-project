"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import {
  isRankingType,
  RANKING_LABELS,
  RANKING_TYPES,
  rankingHref,
} from "@/entities/ranking";

export function RankingTabs() {
  const pathname = usePathname();

  // 경로는 /ranking/[type]/[world]/[page] 라 타입은 항상 두 번째 세그먼트임.
  // /ranking 처럼 타입이 없으면 level 탭이 활성화됨.
  const typeSegment = pathname.split("/")[2];
  const activeType = isRankingType(typeSegment) ? typeSegment : "level";

  return (
    <nav aria-label="랭킹 종류 이동" className="w-full">
      <ul className="bg-muted grid list-none grid-cols-3 gap-1 rounded-3xl p-1 shadow-sm md:grid-cols-9">
        {RANKING_TYPES.map((type) => {
          const isActive = activeType === type;

          return (
            <li key={type}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-full items-center justify-center rounded-2xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px]",
                  isActive && "bg-card/80 text-foreground shadow-sm",
                )}
                href={rankingHref(type)}
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
