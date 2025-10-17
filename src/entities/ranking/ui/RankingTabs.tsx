"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { RANKING_TYPES } from "../model/types/ranking";

// 각 타입별 한글 명칭 (정적 데이터)
const RANKING_LABELS: Record<(typeof RANKING_TYPES)[number], string> = {
  level: "레벨",
  dojang: "무릉도장",
  "root-of-time": "시간의 근원",
  union: "유니온",
  "combat-power": "전투력",
  "kerning-m-tower": "커닝 M 타워",
  achievement: "업적",
  "sharenian-battlefield": "샤레니안 전장",
  "sharenian-waterway": "지하수로",
};

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
            <Link href={`/ranking/${type}`}>{RANKING_LABELS[type]}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
