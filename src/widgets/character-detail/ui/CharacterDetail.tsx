"use client";

import { CharacterProfileCard } from "./CharacterProfileCard";
import { CharacterDetailTabs } from "./CharacterDetailTabs";
import { useQuery } from "@tanstack/react-query";
import { characterQueryKeys, getCharacterDetails } from "@/entities/character";
import { CharacterDetailSkeleton } from "./CharacterDetailSkeleton";

interface CharacterBasicInfoProps {
  ocid: string;
}

export const CharacterDetail = ({ ocid }: CharacterBasicInfoProps) => {
  const detailsKey = characterQueryKeys.details(ocid);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: detailsKey,
    queryFn: () => getCharacterDetails(ocid),
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const characterData = data?.data;

  const titleText = characterData
    ? `${characterData.world_name} ${characterData.character_name} 캐릭터 정보`
    : "캐릭터 정보 로딩 중";

  return (
    <section
      aria-labelledby="character-info-title"
      aria-busy={isLoading}
      className="flex w-full justify-center"
    >
      {/* 로딩 상태에 따라 적절한 텍스트 제공 */}
      <h2 className="sr-only" id="character-info-title">
        {titleText}
      </h2>

      {isLoading && <CharacterDetailSkeleton />}

      {isError && (
        <p role="alert" className="py-10 font-medium text-red-500">
          캐릭터 정보를 불러오는데 실패했습니다.
          <br /> {(error as Error).message}
        </p>
      )}

      {characterData && (
        <div className="flex w-full max-w-3xl flex-col items-center gap-4 md:flex-row md:items-start md:justify-center">
          <CharacterProfileCard data={characterData} />
          <CharacterDetailTabs ocid={ocid} characterData={characterData} />
        </div>
      )}
    </section>
  );
};
