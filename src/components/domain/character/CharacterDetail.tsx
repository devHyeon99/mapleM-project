"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { CharacterProfileCard } from "./CharacterDetail/CharacterProfileCard";
import { CharacterDetailTabs } from "./CharacterDetail/CharacterDetailTabs";
import { CharacterBasicInfo as CharacterBasicInfoType } from "@/entities/character";
import { Skeleton } from "@/shared/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { characterQueryKeys } from "@/entities/character";

interface CharacterDetailsResponse {
  data: CharacterBasicInfoType;
}

const fetchCharacterDetails = async (
  ocid: string,
): Promise<CharacterDetailsResponse> => {
  const res = await fetch(`/api/characters/basic?ocid=${ocid}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error?.message || "캐릭터 정보를 불러오는데 실패했습니다.",
    );
  }
  return res.json();
};

interface CharacterBasicInfoProps {
  ocid: string;
}

export const CharacterDetail = ({ ocid }: CharacterBasicInfoProps) => {
  const detailsKey = characterQueryKeys.details(ocid);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: detailsKey,
    queryFn: () => fetchCharacterDetails(ocid),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 60 * 1000,
  });

  const characterData = data?.data;

  return (
    <section
      aria-labelledby="character-info-title"
      className="w-full max-w-3xl"
    >
      <Card className="rounded-sm">
        <CardHeader className="px-4">
          <CardTitle id="character-info-title">캐릭터 기본정보</CardTitle>
          <CardDescription>
            메이플스토리M의 게임 데이터는 평균 10분 후 확인이
            <br className="md:hidden" />
            가능하므로 데이터가 정확히 일치하지 않을 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 px-0">
          {isLoading && (
            <div className="flex flex-col gap-5">
              <div className="flex h-85.5 w-[340px] flex-col items-center gap-4 rounded-md border p-2">
                <Skeleton className="h-24 w-24 rounded-full" />{" "}
                <Skeleton className="h-4 w-32" />
                <div className="flex w-[300px] flex-col gap-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-90 w-full" />
              </div>
            </div>
          )}
          {isError && (
            <p role="alert" className="text-red-500">
              오류: {(error as Error).message}
            </p>
          )}

          {characterData && (
            <>
              <CharacterProfileCard
                data={characterData as CharacterBasicInfoType}
              />
              <CharacterDetailTabs
                ocid={ocid}
                items={characterData.item_equipment ?? []}
                android={characterData.android_equipment ?? null}
                heart={characterData.heart_equipment ?? null}
              />
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
