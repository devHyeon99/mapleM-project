"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import type { CharacterOcidData } from "@/entities/character";

type WorldName = (typeof WORLD_NAMES)[number];

interface CharactersSearchResultProps {
  name: string;
  characters: CharacterOcidData[];
}

// 링크 기본 동작(새 탭/중클/수정키)을 보존하면서 "일반 좌클릭"만 가로챔
function shouldIntercept(e: React.MouseEvent<HTMLAnchorElement>) {
  if (e.defaultPrevented) return false;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
  if (e.button !== 0) return false;
  return true;
}

export function CharactersSearchResult({
  name,
  characters,
}: CharactersSearchResultProps) {
  const router = useRouter();
  const { addHistory } = useRecentSearch("character-search-history");

  const [isPending, startTransition] = useTransition();
  const [pendingOcid, setPendingOcid] = useState<string | null>(null);

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

  const isAnyCardLoading = isPending && pendingOcid !== null;

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

          const isLoadingThisCard = isPending && pendingOcid === char.ocid;

          return (
            <Link
              key={char.ocid}
              href={href}
              prefetch={false}
              onClick={(e) => {
                // 새 탭/중클/수정키 클릭은 기본 링크 동작 유지
                if (!shouldIntercept(e)) return;

                // 일반 좌클릭만 transition 네비로 가로챔
                e.preventDefault();

                // transition 중 중복 클릭 방지
                if (isPending) return;

                // 히스토리 저장
                addHistory(char.character_name, char.world_name as WorldName);

                // 어떤 카드가 pending인지 표시용
                setPendingOcid(char.ocid);

                startTransition(() => {
                  router.push(href);
                });
              }}
            >
              <Card
                className={cn(
                  "cursor-pointer rounded-xs border-none py-4 shadow-none dark:hover:bg-white/10",
                  isAnyCardLoading &&
                    !isLoadingThisCard &&
                    "cursor-not-allowed opacity-50 hover:bg-transparent",
                )}
              >
                <CardContent className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">
                      {char.character_name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {char.world_name}
                    </p>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1">
                    {isLoadingThisCard && (
                      <Loader2 className="size-5 animate-spin" />
                    )}
                    <ChevronRight className="size-5" aria-hidden="true" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
