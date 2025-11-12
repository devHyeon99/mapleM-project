"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { CharacterSearch } from "@/features/character-search/ui/CharacterSearch";
import { AlertTriangle } from "lucide-react";

export function CharacterNotFoundView() {
  const pathname = usePathname();
  const { removeHistoryByParams } = useRecentSearch("character-search-history");
  const segments = useMemo(() => pathname?.split("/") ?? [], [pathname]);
  const targetWorld =
    segments[1] === "character" && segments.length >= 4
      ? decodeURIComponent(segments[2])
      : null;
  const targetName =
    segments[1] === "character" && segments.length >= 4
      ? decodeURIComponent(segments[3])
      : null;

  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;

    if (segments[1] === "character" && segments.length >= 4) {
      removeHistoryByParams(
        decodeURIComponent(segments[3]),
        decodeURIComponent(segments[2]),
      );
      processedRef.current = true;
    }
  }, [segments, removeHistoryByParams]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6.5 w-full max-w-3xl px-4 pt-2">
        <CharacterSearch />
      </div>
      <AlertTriangle className="text-destructive mb-2 size-12" />
      {(targetWorld || targetName) && (
        <p className="mb-1 text-xl font-medium">
          {targetWorld ? `${targetWorld}` : ""}
          {targetWorld && targetName ? " " : ""}
          {targetName ? `${targetName}` : ""}
        </p>
      )}
      <h2 className="mb-2 text-xl font-medium tracking-tight">
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
