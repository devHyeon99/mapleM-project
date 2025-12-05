"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { RANKING_TYPES } from "../model/types/ranking";
import { RANKING_LABELS } from "../model/constants";

export function RankingTabs() {
  const pathname = usePathname();

  // /ranking 은 기본적으로 level 탭을 활성화한다.
  const lastSegment = pathname.split("/").pop() || "";
  const activeType = RANKING_TYPES.includes(lastSegment as (typeof RANKING_TYPES)[number])
    ? (lastSegment as (typeof RANKING_TYPES)[number])
    : "level";

  return (
    <Tabs value={activeType} className="w-full pt-2">
      <TabsList className="grid h-auto w-full grid-cols-3 gap-1 rounded-xs border-b bg-transparent px-0! py-0 md:grid-cols-9">
        {RANKING_TYPES.map((type) => (
          <TabsTrigger
            className="hover:data-[state=inactive]:text-foreground h-10 rounded-none border-2 border-t-0 border-r-0 border-l-0 bg-transparent! transition-colors duration-150 data-[state=active]:border-b-orange-500! data-[state=active]:shadow-none data-[state=inactive]:text-black/60 hover:data-[state=inactive]:border-b-orange-500"
            key={type}
            value={type}
            asChild
          >
            <Link
              className="md:text-[15px]!"
              href={type === "level" ? "/ranking" : `/ranking/${type}`}
              prefetch={false}
            >
              {RANKING_LABELS[type]}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
