import Image from "next/image";
import Link from "next/link";
import { InfoDescriptionRow } from "@/shared/ui/InfoRow";
import { InfoDateRow } from "@/shared/ui/InfoDateRow";
import type { CharacterDetailData } from "@/entities/character/model/types";
import { CharacterProfileHelpPopover } from "./CharacterProfileHelpPopover";

const NUMBER_FORMATTER = new Intl.NumberFormat("ko-KR");

interface RankingRowsProps {
  overallRanking?: number | null;
  worldRanking?: number | null;
}

const RankingRows = ({ overallRanking, worldRanking }: RankingRowsProps) => {
  if (overallRanking == null || worldRanking == null) return null;

  return (
    <>
      <InfoDescriptionRow label="전체랭킹">
        {NUMBER_FORMATTER.format(overallRanking)}등
      </InfoDescriptionRow>
      <InfoDescriptionRow label="월드랭킹">
        {NUMBER_FORMATTER.format(worldRanking)}등
      </InfoDescriptionRow>
    </>
  );
};

interface CharacterProfileCardProps {
  data: CharacterDetailData;
}

export const CharacterProfileCard = ({ data }: CharacterProfileCardProps) => {
  const expRate = data.character_exp_rate ?? "0";
  const guildName = data.guild_name ?? "-";
  const hasGuild = Boolean(data.guild_name);
  const rawUnionLevel = data.union_data?.union_level ?? 0;
  const unionDisplay =
    rawUnionLevel > 0 ? NUMBER_FORMATTER.format(rawUnionLevel) : "0";

  return (
    <article
      className="bg-card relative w-full flex-col rounded-xs p-4 shadow-sm sm:p-6"
      aria-label={`${data.character_name} 캐릭터 상세정보`}
    >
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex w-full shrink-0 flex-col items-center gap-2 sm:w-44">
          {/* 캐릭터 이미지 */}
          {data.character_image && (
            <Image
              src={data.character_image}
              alt="캐릭터 외형"
              aria-hidden="true"
              width={96}
              height={96}
              className="dark:border-border h-25 w-25 -scale-x-100 transform rounded-full border-2 border-gray-300 bg-[#EAEEF3] dark:bg-[#323232]"
              priority
              unoptimized
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
              unoptimized
            />
            <span>{data.character_name}</span>
          </h2>
        </div>

        {/* 상세 정보 그리드 */}
        <dl className="flex w-full flex-col gap-3 text-sm">
          <div className="flex flex-wrap gap-3">
            <InfoDescriptionRow label="레벨">
              {NUMBER_FORMATTER.format(data.character_level)}
            </InfoDescriptionRow>
            <RankingRows
              overallRanking={data.level_ranking?.ranking}
              worldRanking={data.level_ranking?.world_ranking}
            />
          </div>

          <InfoDescriptionRow label="EXP">{expRate}%</InfoDescriptionRow>
          <InfoDescriptionRow label="직업">
            {data.character_class}
          </InfoDescriptionRow>
          <InfoDescriptionRow label="월드">
            {data.world_name}
          </InfoDescriptionRow>
          <InfoDescriptionRow label="길드">
            {hasGuild ? (
              <Link
                href={`/guild/${encodeURIComponent(data.world_name)}/${encodeURIComponent(guildName)}`}
                prefetch={false}
                className="hover:text-orange-400"
              >
                {guildName}
              </Link>
            ) : (
              guildName
            )}
          </InfoDescriptionRow>
          <div className="flex flex-wrap gap-3">
            <InfoDescriptionRow label="유니온">
              {unionDisplay}
            </InfoDescriptionRow>
            <RankingRows
              overallRanking={data.union_ranking?.ranking}
              worldRanking={data.union_ranking?.world_ranking}
            />
          </div>

          {/* 날짜 정보 그룹 */}
          <div className="flex flex-col gap-3">
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
            <InfoDateRow
              label="랭킹 업데이트"
              date={data.level_ranking?.date}
            />
          </div>
        </dl>
      </div>

      <CharacterProfileHelpPopover />
    </article>
  );
};
