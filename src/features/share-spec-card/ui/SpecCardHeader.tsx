"use client";

import { CharacterDetailData } from "@/entities/character";
import { InfoRow } from "@/shared/ui/InfoRow";

interface SpecCardHeaderProps {
  data: CharacterDetailData;
}

export const SpecCardHeader = ({ data }: SpecCardHeaderProps) => {
  return (
    <>
      <div className="bg-muted/50 flex flex-col items-center gap-4 rounded-lg border p-3 sm:flex-row">
        {/* 캐릭터 이미지 */}
        <div className="dark:border-border h-25 w-25 self-start overflow-hidden rounded-full border-2 border-gray-300 bg-[#EAEEF3] dark:bg-[#323232]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.character_image}
            alt="캐릭터 외형"
            aria-hidden="true"
            width={96}
            height={96}
            className="h-full w-full -scale-x-100 transform object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* 정보 섹션 */}
        <div className="flex flex-1 flex-col gap-2 self-start">
          <h3 className="text-xl font-semibold">
            {data.character_name || "캐릭터 이름"}
          </h3>
          {/* 첫 번째 열은 auto(컨텐츠 크기만큼), 나머지 두 열은 1fr(남은 공간 채움) */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-0.5">
            <InfoRow label="레벨">{data.character_level}</InfoRow>
            <InfoRow label="직업" className="col-span-2">
              {data.character_class}
            </InfoRow>

            <InfoRow label="월드">{data.world_name}</InfoRow>
            <InfoRow label="길드" className="col-span-2">
              {data.guild_name ?? "길드없음"}
            </InfoRow>

            <InfoRow label="유니온">
              {data.union_data?.union_level?.toLocaleString() ?? "0"}
            </InfoRow>
            <InfoRow label="등급" className="col-span-2">
              {data.union_data?.union_grade ?? "없음"}
            </InfoRow>

            {data.level_ranking && (
              <>
                <InfoRow label="전체랭킹">
                  {data.level_ranking?.ranking.toLocaleString()}등
                </InfoRow>
                <InfoRow label="월드랭킹" className="col-span-2">
                  {data.level_ranking?.world_ranking.toLocaleString()}등
                </InfoRow>
              </>
            )}
          </div>
        </div>

        {/* 유니온 등급 아이콘 */}
        {data.union_data?.union_grade_icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.union_data.union_grade_icon}
            alt="유니온 등급 아이콘"
            width={209}
            height={200}
            className="absolute top-9 right-8 h-24 w-auto self-start sm:relative sm:top-0 sm:right-0"
          />
        )}
      </div>
    </>
  );
};
