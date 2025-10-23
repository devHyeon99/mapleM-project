"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { RANKING_TYPES } from "../model/types/ranking";
import { RANKING_LABELS } from "../model/constants";

export function RankingTabs() {
  const pathname = usePathname();

  // 현재 URL 경로에서 활성화된 타입 추출 (예: /ranking/level -> level)
  const activeType = pathname.split("/").pop() || "level";

  return (
    <Tabs value={activeType} className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xs border border-none md:grid-cols-9">
        {RANKING_TYPES.map((type) => (
          <TabsTrigger
            className="hover:data-[state=inactive]:text-foreground h-10 rounded-none border-2 border-t-0 border-r-0 border-l-0 bg-transparent! transition-colors duration-150 data-[state=active]:border-b-orange-500! data-[state=active]:shadow-none data-[state=inactive]:text-black/60 hover:data-[state=inactive]:border-b-orange-500"
            key={type}
            value={type}
            asChild
          >
            <Link href={`/ranking/${type}`} prefetch={false}>
              {RANKING_LABELS[type]}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
