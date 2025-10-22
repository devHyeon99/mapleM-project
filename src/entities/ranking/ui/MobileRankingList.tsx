"use client";

import Link from "next/link";
import type { RankingType, AnyRankingData } from "../model/types/ranking";
import { Renderers, RankingTableContext } from "./ranking-table.config";
import { memo } from "react";
import { RankingIcon } from "./RankingIcon";

// 한글 월드명 인코딩
const encodeWorldName = (name: string) => encodeURIComponent(name);

// 리스트 아이템의 고유 Key 생성
const getItemKey = (
  item: AnyRankingData,
  type: RankingType,
  index: number,
): string => {
  if ("character_name" in item) {
    return `${item.world_name}-${item.character_name}-${item.ranking}`;
  }
  if ("guild_name" in item) {
    return `${item.world_name}-${item.guild_name}-${item.ranking}`;
  }
  return `${type}-${(item as { ranking: number }).ranking}-${index}`;
};

// 랭킹 타입에 따른 라벨과 값 추출
const getStatData = (
  item: AnyRankingData,
  type: RankingType,
): { label: string; value: string } => {
  let label = "";
  let value = "-";

  switch (type) {
    case "level":
      label = "Lv.";
      if ("character_level" in item) value = item.character_level.toString();
      break;
    case "combat-power":
      if ("character_combat_power" in item)
        value = item.character_combat_power.toLocaleString();
      break;
    case "union":
      if ("union_level" in item) value = item.union_level.toLocaleString();
      break;
    case "dojang":
      if ("dojang_floor" in item) value = `${item.dojang_floor}층`;
      break;
    case "kerning-m-tower":
      if ("tower_floor" in item) value = `${item.tower_floor}층`;
      break;
    case "achievement":
      if ("achievement_score" in item)
        value = item.achievement_score.toLocaleString();
      break;
    case "root-of-time":
      if ("max_damage" in item) value = item.max_damage.toLocaleString();
      break;
    default:
      if (type.includes("sharenian") && "season_score" in item) {
        value = Number(item.season_score).toLocaleString();
      }
      break;
  }

  return { label, value };
};

interface MobileRankingListProps {
  type: RankingType;
  data: AnyRankingData[];
  context: RankingTableContext;
}

export const MobileRankingList = ({
  type,
  data,
  context,
}: MobileRankingListProps) => {
  return (
    <div className="bg-background flex flex-col divide-y border-b">
      {/* 헤더 영역 */}
      <div className="bg-secondary text-muted-foreground flex h-10 items-center gap-4 px-3 py-2 text-sm font-medium">
        <span className="w-8 text-center">순위</span>
        <span className="w-8">정보</span>
      </div>

      {/* 리스트 영역 */}
      {data.map((item, index) => (
        <RankingRow
          key={getItemKey(item, type, index)}
          item={item}
          type={type}
          context={context}
        />
      ))}
    </div>
  );
};

// 개별 랭킹 로우
const RankingRow = memo(
  ({
    item,
    type,
    context,
  }: {
    item: AnyRankingData;
    type: RankingType;
    context: RankingTableContext;
  }) => {
    const isSharenian = type.includes("sharenian");

    return (
      <div className="bg-muted/30 flex items-center justify-between p-3">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex w-8 shrink-0 flex-col items-center justify-center">
            <span className="text-foreground text-lg font-bold">
              {Renderers.Rank(item, context)}
            </span>
          </div>

          <div className="flex min-w-0 flex-col">
            {isSharenian ? (
              <SharenianInfo item={item} />
            ) : (
              <GeneralInfo item={item} />
            )}
          </div>
        </div>

        <div className="shrink-0 pl-2">
          <StatDisplay item={item} type={type} />
        </div>
      </div>
    );
  },
);
RankingRow.displayName = "RankingRow";

// 샤레니안 랭킹 정보
const SharenianInfo = ({ item }: { item: AnyRankingData }) => {
  if (!("guild_name" in item)) return null;
  const guildMark = "guild_mark_icon" in item ? item.guild_mark_icon : null;

  return (
    <>
      <div className="flex items-center gap-1">
        {guildMark && (
          <RankingIcon
            src={guildMark}
            alt="guild mark"
            className="h-4 w-4 rounded-sm"
            size={16}
          />
        )}
        {item.guild_name && (
          <Link
            href={`/guild/${item.world_name}/${item.guild_name}`}
            className="truncate text-sm font-bold"
          >
            {item.guild_name}
          </Link>
        )}
      </div>

      <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
        <span className="truncate">{item.world_name}</span>
      </div>
    </>
  );
};

// 일반 랭킹 정보
const GeneralInfo = ({ item }: { item: AnyRankingData }) => {
  if (!("character_name" in item)) return null;

  const jobName = "character_class" in item ? item.character_class : null;
  const guildName = "guild_name" in item ? item.guild_name : null;

  return (
    <>
      <div className="flex items-center gap-1.5">
        <RankingIcon
          src={`/worlds/${encodeWorldName(item.world_name)}.png`}
          alt={item.world_name}
          className="h-3.5 w-3.5"
          size={14} // 기존 className h-3.5 w-3.5에 맞춰 사이즈 조정 (약 14px)
        />
        <Link
          href={`/character/${item.world_name}/${item.character_name}`}
          className="truncate text-sm font-bold"
        >
          {item.character_name}
        </Link>
      </div>

      <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
        <span>{jobName || ""}</span>

        {guildName && (
          <>
            <span className="bg-border h-2 w-[1px]" />
            <Link
              href={`/guild/${item.world_name}/${guildName}`}
              className="flex max-w-[100px] items-center gap-1 truncate"
            >
              {guildName}
            </Link>
          </>
        )}
      </div>
    </>
  );
};

// 통계 표시 컴포넌트
const StatDisplay = ({
  item,
  type,
}: {
  item: AnyRankingData;
  type: RankingType;
}) => {
  const { label, value } = getStatData(item, type);

  return (
    <div className="flex gap-0.5">
      {label && <span className="text-muted-foreground text-sm">{label}</span>}
      <span className="text-primary text-sm font-bold">{value}</span>
    </div>
  );
};
