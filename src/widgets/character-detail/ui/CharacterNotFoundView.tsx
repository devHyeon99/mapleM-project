"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { CharacterSearch } from "@/features/character-search";
import { AlertTriangle } from "lucide-react";

interface CharacterPathParams {
  name: string;
  world: string;
}

const parseCharacterPathname = (
  pathname: string | null,
): CharacterPathParams | null => {
  const segments = pathname?.split("/") ?? [];
  if (segments[1] !== "character" || segments.length < 4) return null;

  return {
    world: decodeURIComponent(segments[2]),
    name: decodeURIComponent(segments[3]),
  };
};

export function CharacterNotFoundView() {
  const pathname = usePathname();
  const { removeHistoryByParams } = useRecentSearch("character-search-history");
  const targetCharacter = useMemo(
    () => parseCharacterPathname(pathname),
    [pathname],
  );

  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    if (!targetCharacter) return;

    removeHistoryByParams(targetCharacter.name, targetCharacter.world);
    processedRef.current = true;
  }, [targetCharacter, removeHistoryByParams]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6.5 w-full max-w-3xl px-4 pt-2">
        <CharacterSearch />
      </div>
      <AlertTriangle className="text-destructive mb-2 size-12" />
      {targetCharacter && (
        <p className="mb-1 text-xl font-medium">
          {targetCharacter.world} {targetCharacter.name}
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
