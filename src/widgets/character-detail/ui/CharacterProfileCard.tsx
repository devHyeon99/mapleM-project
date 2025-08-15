"use client";

import Image from "next/image";
import { InfoRow } from "@/shared/ui/InfoRow";
import { InfoDateRow } from "@/shared/ui/InfoDateRow";
import { CharacterDetailData } from "@/entities/character";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CircleHelp } from "lucide-react";
import { useMemo } from "react";

// --------------------------------------------------------------------------
// 1. Logic Separation (Custom Hook)
// --------------------------------------------------------------------------
const useCharacterProfileLogic = (data: CharacterDetailData) => {
  return useMemo(() => {
    const expRate = data.character_exp_rate ?? "0";
    const guildName = data.guild_name ?? "길드없음";

    const rawUnionLevel = data.union_data?.union_level ?? 0;

    const unionDisplay =
      rawUnionLevel > 0 ? `${rawUnionLevel.toLocaleString()} ` : "0";

    return {
      expRate,
      guildName,
      unionDisplay,
    };
  }, [data]);
};

// --------------------------------------------------------------------------
// 2. Component Extraction (Sub-component)
// --------------------------------------------------------------------------
const DataUpdateTooltip = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="데이터 갱신 주기 안내"
          className="text-muted-foreground hover:text-foreground absolute top-2 right-2 transition-colors"
        >
          <CircleHelp className="size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="bg-secondary w-80 p-3 opacity-95"
      >
        {/* ul 태그를 사용하거나 flex-col로 간격(gap)을 줌 */}
        <div className="flex flex-col gap-2 text-xs leading-relaxed">
          <p>
            <span className="text-foreground font-semibold">
              1. 데이터 갱신
            </span>
            <br />
            게임 데이터는 평균 10분 후 반영되므로 실제와 차이가 있을 수
            있습니다.
          </p>
          <p>
            <span className="text-foreground font-semibold">2. 랭킹 정보</span>
            <br />
            서버 전체 10,000등 이내의 캐릭터만 랭킹이 표기됩니다.
          </p>
          <p>
            <span className="text-foreground font-semibold">
              3. 랭킹 업데이트
            </span>
            <br />
            랭킹은 매일 오전 2시 30분 경에 1일 1회 집계되어 제공됩니다.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// --------------------------------------------------------------------------
// 3. Main Component
// --------------------------------------------------------------------------
interface CharacterProfileCardProps {
  data: CharacterDetailData;
}

export const CharacterProfileCard = ({ data }: CharacterProfileCardProps) => {
  const { expRate, guildName, unionDisplay } = useCharacterProfileLogic(data);

  return (
    <article
      className="bg-card relative flex h-fit w-full max-w-90 flex-col items-center gap-2 rounded-xs border p-4 pt-8 md:max-w-none md:flex-1 md:self-start"
      aria-label={`${data.character_name} 캐릭터 상세정보`}
    >
      {/* 랭킹 업데이트 날짜 */}
      {data.level_ranking && (
        <div className="text-muted-foreground absolute top-2 left-4 text-xs font-semibold">
          랭킹 업데이트 날짜 - {data.level_ranking?.date.replace(/-/g, ".")}
        </div>
      )}
      {/* 캐릭터 이미지 */}
      {data.character_image && (
        <Image
          src={data.character_image}
          alt="캐릭터 외형"
          aria-hidden="true"
          width={96}
          height={96}
          className="dark:border-border h-25 w-25 -scale-x-100 transform rounded-full border-2 border-gray-300 bg-[#EAEEF3] dark:bg-[#323232]"
        />
      )}

      {/* 이름 및 월드 */}
      <h2 className="flex items-center justify-center gap-1 font-semibold">
        <Image
          src={`/worlds/${data.world_name}.png`}
          alt=""
          aria-hidden="true"
          width={14}
          height={14}
        />
        <span>{data.character_name}</span>
      </h2>

      {/* 상세 정보 그리드 */}
      <dl className="flex w-full flex-col gap-3 text-sm">
        <div className="flex gap-3">
          <InfoRow label="레벨">
            {data.character_level.toLocaleString()}
          </InfoRow>
          {data.level_ranking && (
            <>
              <InfoRow label="전체랭킹">
                {data.level_ranking.ranking.toLocaleString()}등
              </InfoRow>
              <InfoRow label="월드랭킹">
                {data.level_ranking.world_ranking}등
              </InfoRow>
            </>
          )}
        </div>

        <InfoRow label="EXP">{expRate}%</InfoRow>
        <InfoRow label="직업">{data.character_class}</InfoRow>
        <InfoRow label="월드">{data.world_name}</InfoRow>
        <InfoRow label="길드">{guildName}</InfoRow>
        <div className="flex gap-3">
          <InfoRow label="유니온">{unionDisplay}</InfoRow>
          {data.union_ranking && (
            <>
              <InfoRow label="전체랭킹">
                {data.union_ranking.ranking.toLocaleString()}등
              </InfoRow>
              <InfoRow label="월드랭킹">
                {data.union_ranking.world_ranking}등
              </InfoRow>
            </>
          )}
        </div>

        {/* 날짜 정보 그룹 */}
        <div className="flex flex-col gap-3 sm:col-span-2">
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
        </div>
      </dl>

      {/* 도움말 팝오버 컴포넌트 */}
      <DataUpdateTooltip />
    </article>
  );
};
