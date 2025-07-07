"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { useCharacterSearchAll } from "@/hooks/useCharacterSearchAll";
import { LoadingCard } from "@/components/common/LoadingCard";
import { CharacterSearch } from "@/components/home/CharacterSearch";

export default function CharacterListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") ?? undefined;

  const { data: characters, isLoading } = useCharacterSearchAll(name);

  if (!name)
    return (
      <p className="text-muted-foreground mt-10 text-center">
        검색어를 불러오는 중입니다...
      </p>
    );

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
      <p className="text-muted-foreground mt-10 text-center">
        “{name}” 검색 결과가 없습니다.
      </p>
    );

  return (
    <div className="flex flex-col items-center">
      <CharacterSearch />
      <h1 className="mt-6 text-lg font-bold lg:text-xl">
        전체 월드 내{" "}
        <strong className="text-[#E98300]">&quot;{name}&quot;</strong> 캐릭터에
        대한 검색 결과 입니다.
      </h1>
      <p className="text-muted-foreground mb-4 text-sm font-bold">
        총 {characters.length}개의 검색 결과가 있습니다.
      </p>

      <div className="flex w-full max-w-3xl flex-col gap-4">
        {characters.map((char) => (
          <Card
            key={char.ocid}
            onClick={() => router.push(`/character/${char.ocid}`)}
            className="hover:bg-muted dark:hover:bg-card/70 cursor-pointer rounded-sm py-4"
          >
            <CardContent className="flex items-center">
              <div>
                <p className="text-lg font-semibold">{char.character_name}</p>
                <p className="text-muted-foreground text-sm font-bold">
                  {char.world_name}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-muted-foreground mt-2 w-full max-w-3xl text-right text-sm font-bold">
        캐릭터가 존재하지만 검색이 되지 않는 경우가 있습니다.
      </p>
    </div>
  );
}
