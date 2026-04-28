"use client";
import Link, { useLinkStatus } from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { NotFoundMessage } from "@/shared/ui/NotFoundMessage";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { characterHref } from "@/shared/lib/url";
import type { CharacterOcidData } from "@/entities/character";

interface CharactersSearchResultProps {
  name: string;
  characters: CharacterOcidData[];
  failedWorlds?: number;
}

function LinkStatusIcon() {
  const { pending } = useLinkStatus();

  return (
    <div className="text-muted-foreground flex items-center gap-1">
      {pending ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <ChevronRight className="size-5" aria-hidden="true" />
      )}
    </div>
  );
}

export function CharactersSearchResult({
  name,
  characters,
  failedWorlds = 0,
}: CharactersSearchResultProps) {
  const { addHistory } = useRecentSearch("character-search-history");

  if (characters.length === 0) {
    return failedWorlds > 0 ? (
      <NotFoundMessage
        className="mt-6.5 mb-8"
        title="검색 결과를 불러오지 못했습니다"
        subject={name}
        description={
          "일부 월드에서 응답을 받지 못했습니다.\n잠시 후 다시 시도해주세요."
        }
      />
    ) : (
      <NotFoundMessage
        className="mt-6.5 mb-8"
        title="캐릭터를 찾을 수 없습니다"
        subject={name}
        description={
          "캐릭터 닉네임이 정확한지 다시 확인해주세요.\n삭제되었거나 존재하지 않는 캐릭터일 수 있습니다."
        }
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-1 py-10">
        <p className="text-lg font-bold md:text-2xl">
          전체 월드 내 <strong>&quot;{name}&quot;</strong> 검색 결과
        </p>
        <p className="text-muted-foreground text-sm md:text-base">
          총 {characters.length}개의 검색 결과가 있습니다.
        </p>
        {failedWorlds > 0 && (
          <p className="text-destructive text-xs md:text-sm">
            {failedWorlds}개 월드는 조회에 실패해 결과에서 빠졌을 수 있습니다.
          </p>
        )}
      </div>

      <ul className="flex w-full flex-col gap-2">
        {characters.map((char) => (
          <li key={char.ocid}>
            <Link
              href={characterHref(char.world_name, char.character_name)}
              prefetch={false}
              onNavigate={() => {
                addHistory(char.character_name, char.world_name);
              }}
            >
              <Card className="hover:bg-accent cursor-pointer border-none py-4">
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {char.character_name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {char.world_name}
                    </p>
                  </div>
                  <LinkStatusIcon />
                </CardContent>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
