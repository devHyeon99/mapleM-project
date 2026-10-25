"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { NotFoundMessage } from "@/shared/ui/NotFoundMessage";
import { worldFromSlug } from "@/shared/config/constants/worlds";
import { safeDecode } from "@/shared/lib/url";
import { STORAGE_KEYS } from "@/shared/config/constants/storage";

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
    world: worldFromSlug(safeDecode(segments[2])),
    name: safeDecode(segments[3]),
  };
};

export function CharacterNotFoundView() {
  const pathname = usePathname();
  const { removeHistoryByParams } = useRecentSearch(
    STORAGE_KEYS.CHARACTER_SEARCH_HISTORY,
  );
  const targetCharacter = useMemo(
    () => parseCharacterPathname(pathname),
    [pathname],
  );

  useEffect(() => {
    if (!targetCharacter) return;
    removeHistoryByParams(targetCharacter.name, targetCharacter.world);
  }, [targetCharacter, removeHistoryByParams]);

  return (
    <NotFoundMessage
      className="mt-4.5"
      title="캐릭터를 찾을 수 없습니다"
      subject={
        targetCharacter
          ? `${targetCharacter.world} ${targetCharacter.name}`
          : undefined
      }
      description={
        "캐릭터 닉네임이 정확한지 다시 확인해주세요.\n삭제되었거나 존재하지 않는 캐릭터일 수 있습니다."
      }
    />
  );
}
