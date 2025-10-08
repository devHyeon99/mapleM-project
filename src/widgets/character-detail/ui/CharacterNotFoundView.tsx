"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/model/hooks/useRecentSearch";
import { CharacterSearch } from "@/features/character-search/ui/CharacterSearch";

export function CharacterNotFoundView() {
  const pathname = usePathname();
  const { removeHistoryByParams } = useRecentSearch("character-search-history");

  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    const segments = pathname?.split("/") ?? [];

    if (segments[1] === "character" && segments.length >= 4) {
      const targetWorld = decodeURIComponent(segments[2]);
      const targetName = decodeURIComponent(segments[3]);

      removeHistoryByParams(targetName, targetWorld);
      processedRef.current = true;
    }
  }, [pathname, removeHistoryByParams]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6.5 w-full max-w-3xl">
        <CharacterSearch />
      </div>

      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        캐릭터를 찾을 수 없습니다
      </h2>
      <p className="text-muted-foreground mb-8 text-sm">
        캐릭터 닉네임이 정확한지 다시 확인해주세요.
        <br />
        삭제되었거나 존재하지 않는 캐릭터일 수 있습니다.
      </p>
    </div>
  );
}
