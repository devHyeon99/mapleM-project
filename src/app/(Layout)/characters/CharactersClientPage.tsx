"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/shared/ui/card";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { CharacterSearch } from "@/features/character-search";
import Link from "next/link";
import { AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { useCharacterSearchAll } from "@/features/character-search-all";

export default function CharactersClientPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") ?? undefined;

  const router = useRouter();

  const [loadingOcid, setLoadingOcid] = useState<string | null>(null);

  const { data: characters, isLoading } = useCharacterSearchAll(name);

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-6">
        <CharacterSearch />
        <LoadingCard
          message={`전체 월드에서 "${name}" 캐릭터를 찾는 중입니다... `}
        />
      </div>
    );

  if (!characters || characters.length === 0)
    return (
      <div className="flex w-full flex-col items-center gap-6">
        <CharacterSearch />
        <div className="bg-card flex w-full max-w-3xl flex-col items-center justify-center gap-4 rounded-lg border p-4 text-center shadow-md">
          <AlertTriangle className="text-destructive size-12" />
          <h2 className="text-xl font-bold">&quot;{name}&quot;</h2>
          <p className="text-lg font-medium">캐릭터를 찾을 수 없습니다.</p>
          <p className="text-muted-foreground">
            월드와 캐릭터 이름을 다시 확인하거나,
            <br />위 검색창을 통해 다른 캐릭터를 검색해 보세요.
          </p>
        </div>
      </div>
    );

  const isAnyCardLoading = loadingOcid !== null;

  return (
    <div className="flex w-full flex-col items-center">
      <CharacterSearch />
      <h1 className="mt-6 text-lg font-bold lg:text-xl">
        전체 월드 내{" "}
        <strong className="text-[#cc4b00] dark:text-[#ff6f1b]">
          &quot;{name}&quot;
        </strong>{" "}
        캐릭터에 대한 검색 결과 입니다.
      </h1>
      <p className="text-muted-foreground mb-4 text-sm">
        총 {characters.length}개의 검색 결과가 있습니다.
      </p>

      <div className="flex w-full max-w-3xl flex-col gap-4">
        {characters.map((char) => {
          const isLoadingThisCard = loadingOcid === char.ocid;
          const href = `/character/${encodeURIComponent(char.world_name)}/${encodeURIComponent(char.character_name)}`;

          return (
            <Link
              key={char.ocid}
              href={href}
              onClick={(e) => {
                if (isAnyCardLoading) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                setLoadingOcid(char.ocid);
                router.push(href);
              }}
              aria-label={`${char.world_name} 월드의 ${char.character_name} 캐릭터 정보 보기`}
              aria-disabled={isAnyCardLoading && !isLoadingThisCard}
              className="focus-visible:border-ring rounded-sm transition-all outline-none focus-visible:ring-1 focus-visible:ring-offset-1"
            >
              <Card
                className={cn(
                  "hover:bg-muted dark:hover:bg-card/70 cursor-pointer rounded-sm py-4",
                  isAnyCardLoading &&
                    !isLoadingThisCard &&
                    "cursor-not-allowed opacity-50 hover:bg-transparent dark:hover:bg-transparent",
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

                  {isLoadingThisCard && (
                    <Loader2 className="size-5 animate-spin" />
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-2 w-full max-w-3xl text-right text-sm">
        캐릭터가 존재하지만 검색이 되지 않는 경우가 있습니다.
      </p>
    </div>
  );
}
