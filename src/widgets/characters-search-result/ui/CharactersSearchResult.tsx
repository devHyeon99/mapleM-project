"use client";
import { useRef } from "react";
import Link, { useLinkStatus } from "next/link";
import { AlertTriangle, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import type { CharacterOcidData } from "@/entities/character";

type WorldName = (typeof WORLD_NAMES)[number];

interface CharactersSearchResultProps {
  name: string;
  characters: CharacterOcidData[];
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
}: CharactersSearchResultProps) {
  const { addHistory } = useRecentSearch("character-search-history");
  const isNavigatingRef = useRef(false);

  if (!characters || characters.length === 0) {
    return (
      <div className="mt-6.5 flex w-full flex-col items-center justify-center">
        <AlertTriangle className="text-destructive mb-2 size-12" />
        <h2 className="mb-1 text-xl font-medium">{name}</h2>
        <p className="mb-2 text-xl font-medium tracking-tight">
          캐릭터를 찾을 수 없습니다
        </p>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          캐릭터 닉네임이 정확한지 다시 확인해주세요.
          <br />
          삭제되었거나 존재하지 않는 캐릭터일 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-1 py-10">
        <h1 className="text-lg font-bold md:text-2xl">
          전체 월드 내 <strong>&quot;{name}&quot;</strong> 검색 결과
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          총 {characters.length}개의 검색 결과가 있습니다.
        </p>
      </div>

      <div className="flex w-full flex-col gap-0.5 pb-10">
        {characters.map((char) => {
          const href = `/character/${encodeURIComponent(
            char.world_name,
          )}/${encodeURIComponent(char.character_name)}`;

          return (
            <Link
              key={char.ocid}
              href={href}
              prefetch={false}
              onNavigate={(event) => {
                if (isNavigatingRef.current) {
                  event.preventDefault();
                  return;
                }

                isNavigatingRef.current = true;
                addHistory(char.character_name, char.world_name as WorldName);
              }}
            >
              <Card className="cursor-pointer rounded-xs border-none py-4 shadow-none dark:hover:bg-white/10">
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
          );
        })}
      </div>
    </div>
  );
}
