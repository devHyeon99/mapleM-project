"use client";
import Image from "next/image";
import { InfoRow } from "@/components/common/InfoRow";
import { InfoDateRow } from "@/components/common/InfoDateRow";
import { CharacterBasicInfo } from "@/types/character";

interface CharacterProfileCardProps {
  data: CharacterBasicInfo;
}

export const CharacterProfileCard = ({ data }: CharacterProfileCardProps) => {
  return (
    <article
      className="bg-card flex w-[340px] flex-col items-center gap-2 rounded-xs border p-4"
      aria-label="캐릭터 상세정보"
    >
      {data.character_image && (
        <Image
          src={data.character_image}
          alt={`${data.character_name} 캐릭터 이미지`}
          width={96}
          height={96}
          className="dark:border-border -scale-x-100 transform rounded-full border-2 border-white bg-[#EAEEF3] dark:bg-[#323232]"
        />
      )}

      <h2 className="flex items-center justify-center gap-1 font-semibold">
        <Image
          src={`/worlds/${data.world_name}.png`}
          alt={`${data.world_name} 서버 아이콘`}
          width={14}
          height={14}
        />
        {data.character_name}
      </h2>

      <dl className="flex w-full flex-col gap-2 text-sm">
        <InfoRow label="레벨">{data.character_level}</InfoRow>
        <InfoRow label="EXP">{data.character_exp_rate ?? "0"}%</InfoRow>
        <InfoRow label="직업">{data.character_job_name}</InfoRow>
        <InfoRow label="월드">{data.world_name}</InfoRow>
        <InfoRow label="길드">{data.guild_name ?? "길드없음"}</InfoRow>

        <InfoDateRow label="생성일" date={data.character_date_create} />
        <InfoDateRow
          label="마지막 접속"
          date={data.character_date_last_login}
          withTime
        />
        <InfoDateRow
          label="마지막 로그아웃"
          date={data.character_date_last_logout}
          withTime
        />
      </dl>
    </article>
  );
};
