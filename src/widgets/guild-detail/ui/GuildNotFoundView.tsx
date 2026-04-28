"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { NotFoundMessage } from "@/shared/ui/NotFoundMessage";
import { worldFromSlug } from "@/shared/config/constants/worlds";

export function GuildNotFoundView() {
  const pathname = usePathname();
  const { removeHistoryByParams } = useRecentSearch("guild-search-history");

  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const segments = pathname?.split("/") ?? [];

    if (segments.length >= 4) {
      const world = worldFromSlug(decodeURIComponent(segments[2]));
      const guildName = decodeURIComponent(segments[3]);

      removeHistoryByParams(guildName, world);

      processedRef.current = true;
    }
  }, [pathname, removeHistoryByParams]);

  return (
    <NotFoundMessage
      className="pt-8 pb-8"
      title="길드 정보를 찾을 수 없습니다"
      description={
        "입력하신 월드와 길드명을 다시 확인해주세요.\n삭제되었거나 존재하지 않는 길드일 수 있습니다."
      }
    />
  );
}
