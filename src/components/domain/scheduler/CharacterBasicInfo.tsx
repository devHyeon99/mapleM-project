"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCharacterBasicInfo } from "@/hooks/useCharacterBasicInfo";
import { CharacterProfileCard } from "./CharacterBasicInfo/CharacterProfileCard";
import { CharacterBasicInfoTabs } from "./CharacterBasicInfo/CharacterBasicInfoTabs";
import { CharacterBasicInfo as CharacterBasicInfoType } from "@/types/character";
import { Skeleton } from "@/components/ui/skeleton";

interface CharacterBasicInfoProps {
  ocid: string;
}

export const CharacterBasicInfo = ({ ocid }: CharacterBasicInfoProps) => {
  const { data, isLoading, isError, error } = useCharacterBasicInfo(ocid);

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
                {/* 캐릭터 이미지 */}
                <Skeleton className="h-4 w-32" /> {/* 캐릭터 이름 */}
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
          {data && (
            <>
              <CharacterProfileCard data={data as CharacterBasicInfoType} />
              <CharacterBasicInfoTabs
                ocid={ocid}
                items={data.item_equipment ?? []}
                android={data.android_equipment ?? null}
                heart={data.heart_equipment ?? null}
              />
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
