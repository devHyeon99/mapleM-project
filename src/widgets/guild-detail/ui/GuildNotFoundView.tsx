"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/model/hooks/useRecentSearch";
import { GuildSearch } from "@/features/guild-search/ui/GuildSearch";

export function GuildNotFoundView() {
  const pathname = usePathname();
  const { removeHistoryByParams } = useRecentSearch("guild-search-history");

  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const segments = pathname?.split("/") ?? [];

    if (segments.length >= 4) {
      const world = decodeURIComponent(segments[2]);
      const guildName = decodeURIComponent(segments[3]);

      removeHistoryByParams(guildName, world);

      processedRef.current = true;
    }
  }, [pathname, removeHistoryByParams]);

  return (
    <div className="flex flex-col items-center justify-center py-4 text-center">
      <div className="mb-6.5 w-full max-w-4xl">
        <GuildSearch />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight md:text-3xl">
        길드 정보를 찾을 수 없습니다
      </h2>
      <p className="text-muted-foreground mb-8 text-sm md:text-base">
        입력하신 월드와 길드명을 다시 확인해주세요.
        <br />
        삭제되었거나 존재하지 않는 길드일 수 있습니다.
      </p>
    </div>
  );
}
