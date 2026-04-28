"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { CharacterSearch } from "@/features/character-search";
import { AlertTriangle } from "lucide-react";
import { worldFromSlug } from "@/shared/config/constants/worlds";

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
    // URL 세그먼트는 영문 슬러그라 화면 표기·검색 기록 대조용 한글 월드명으로 되돌린다
    world: worldFromSlug(decodeURIComponent(segments[2])),
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

  useEffect(() => {
    if (!targetCharacter) return;
    removeHistoryByParams(targetCharacter.name, targetCharacter.world);
  }, [targetCharacter, removeHistoryByParams]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6.5 w-full max-w-3xl px-4 pt-2">
        <CharacterSearch />
      </div>
      <AlertTriangle className="text-destructive size-12" />
      <h2 className="text-xl font-medium">캐릭터를 찾을 수 없습니다</h2>
      {targetCharacter && (
        <p className="my-2 text-xl font-medium">
          {targetCharacter.world} {targetCharacter.name}
        </p>
      )}
      <p className="text-muted-foreground text-sm">
        캐릭터 닉네임이 정확한지 다시 확인해주세요.
        <br />
        삭제되었거나 존재하지 않는 캐릭터일 수 있습니다.
      </p>
    </div>
  );
}
