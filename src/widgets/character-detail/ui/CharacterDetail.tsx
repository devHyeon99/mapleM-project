"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { CharacterProfileCard } from "./CharacterProfileCard";
import { CharacterDetailTabs } from "./CharacterDetailTabs";
import { useQuery } from "@tanstack/react-query";
import {
  characterQueryKeys,
  fetchCharacterDetails,
} from "@/entities/character";
import { CharacterDetailSkeleton } from "./CharacterDetailSkeleton";

interface CharacterBasicInfoProps {
  ocid: string;
}

export const CharacterDetail = ({ ocid }: CharacterBasicInfoProps) => {
  const detailsKey = characterQueryKeys.details(ocid);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: detailsKey,
    queryFn: () => fetchCharacterDetails(ocid),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const characterData = data?.data;

  return (
    <section
      aria-labelledby="character-info-title"
      className="w-full max-w-3xl"
    >
      <Card className="rounded-xs">
        <CardHeader className="px-4">
          <CardTitle id="character-info-title">캐릭터 기본정보</CardTitle>
          <CardDescription>
            메이플스토리M의 게임 데이터는 평균 10분 후 확인이
            <br className="md:hidden" />
            가능하므로 데이터가 정확히 일치하지 않을 수 있습니다.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 px-0">
          {isLoading && <CharacterDetailSkeleton />}
          {isError && (
            <p role="alert" className="text-red-500">
              오류: {(error as Error).message}
            </p>
          )}

          {characterData && (
            <>
              <CharacterProfileCard data={characterData} />
              <CharacterDetailTabs ocid={ocid} characterData={characterData} />
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
