/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { RankingType, AnyRankingData } from "../model/types/ranking";
import { Renderers, RankingTableContext } from "./ranking-table.config";

interface MobileRankingListProps {
  type: RankingType;
  data: AnyRankingData[];
  context: RankingTableContext;
}

// ----------------------------------------------------------------------
// 메인 컴포넌트
// ----------------------------------------------------------------------

export const MobileRankingList = ({
  type,
  data,
  context,
}: MobileRankingListProps) => {
  return (
    <div className="bg-background flex flex-col divide-y border-b">
      <div className="bg-secondary text-muted-foreground flex h-10 items-center gap-4 px-3 py-2 text-sm font-medium">
        <span className="w-8 text-center">순위</span>
        <span className="w-8">정보</span>
      </div>

      {data.map((item, index) => {
        // Key 생성
        let uniqueKey = "";
        if ("character_name" in item) {
          uniqueKey = `${item.world_name}-${item.character_name}-${item.ranking}`;
        } else if ("guild_name" in item) {
          uniqueKey = `${item.world_name}-${item.guild_name}-${item.ranking}`;
        } else {
          uniqueKey = `${type}-${(item as { ranking: number }).ranking}-${index}`;
        }

        const isSharenian = type.includes("sharenian");

        return (
          <div
            key={uniqueKey}
            className="bg-muted/30 flex items-center justify-between p-3"
          >
            <div className="flex min-w-0 items-center gap-4">
              {/* 1. 순위 섹션 */}
              <div className="flex w-8 shrink-0 flex-col items-center justify-center">
                <span className="text-foreground text-lg font-bold">
                  {Renderers.Rank(item, context)}
                </span>
              </div>

              {/* 2. 정보 섹션 (타입에 따라 분기) */}
              <div className="flex min-w-0 flex-col">
                {isSharenian ? (
                  <SharenianInfo item={item} />
                ) : (
                  <GeneralInfo item={item} />
                )}
              </div>
            </div>

            {/* 3. 스탯 섹션 */}
            <div className="shrink-0 pl-2">
              <StatDisplay item={item} type={type} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ----------------------------------------------------------------------
// 하위 컴포넌트 (Sub-components)
// ----------------------------------------------------------------------

/** 공통 아이콘 컴포넌트 */
const RankingIcon = ({
  src,
  alt,
  className,
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) => {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-contain", className)}
      onError={(e) => (e.currentTarget.style.display = "none")}
    />
  );
};

/** 샤레니안 랭킹 정보 (길드 중심) */
const SharenianInfo = ({ item }: { item: AnyRankingData }) => {
  // 1. 길드 이름이 없으면 렌더링 불가
  if (!("guild_name" in item)) return null;

  // 2. [수정됨] guild_mark_icon 안전하게 접근
  const guildMark = "guild_mark_icon" in item ? item.guild_mark_icon : null;

  return (
    <>
      {/* 상단: 길드 마크 + 길드명 */}
      <div className="flex items-center gap-1">
        {guildMark && (
          <RankingIcon
            src={guildMark}
            alt="guild mark"
            className="h-4 w-4 rounded-sm"
          />
        )}
        <Link
          href={`/guild/${item.world_name}/${item.guild_name}`}
          className="truncate text-sm font-bold"
        >
          {item.guild_name}
        </Link>
      </div>

      {/* 하단: 월드 아이콘 + 마스터명 */}
      <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
        <span className="truncate">{item.world_name}</span>
      </div>
    </>
  );
};

/** 일반 랭킹 정보 (캐릭터 중심) */
const GeneralInfo = ({ item }: { item: AnyRankingData }) => {
  // 1. 캐릭터 이름이 없으면 렌더링 불가
  if (!("character_name" in item)) return null;

  // 2. 속성 존재 여부 체크 (Safe Access)
  const jobName = "character_class" in item ? item.character_class : null;
  const guildName = "guild_name" in item ? item.guild_name : null;

  return (
    <>
      {/* 상단: 월드 아이콘 + 닉네임 */}
      <div className="flex items-center gap-1.5">
        <RankingIcon
          src={`/worlds/${item.world_name}.png`}
          alt={item.world_name}
          className="h-3.5 w-3.5"
        />
        <Link
          href={`/character/${item.world_name}/${item.character_name}`}
          className="truncate text-sm font-bold"
        >
          {item.character_name}
        </Link>
      </div>

      {/* 하단: 직업/등급 + 구분선 + 길드 */}
      <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
        <span>{jobName || ""}</span>

        {/* 길드가 있으면 구분선과 함께 표시 */}
        {guildName && (
          <>
            <span className="bg-border h-2 w-[1px]" /> {/* 구분선 */}
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

/** 우측 스탯 표시 컴포넌트 */
const StatDisplay = ({
  item,
  type,
}: {
  item: AnyRankingData;
  type: RankingType;
}) => {
  let label = "";
  let value = "";

  // 랭킹 타입별 라벨/값 설정 (Safe Access)
  if (type === "level") {
    label = "Lv.";
    value = "character_level" in item ? item.character_level.toString() : "-";
  } else if (type === "combat-power") {
    value =
      "character_combat_power" in item
        ? item.character_combat_power.toLocaleString()
        : "-";
  } else if (type === "union") {
    value = "union_level" in item ? item.union_level.toLocaleString() : "-";
  } else if (type === "dojang") {
    value = "dojang_floor" in item ? `${item.dojang_floor}층` : "-";
  } else if (type === "kerning-m-tower") {
    value = "tower_floor" in item ? `${item.tower_floor}층` : "-";
  } else if (type === "achievement") {
    value =
      "achievement_score" in item
        ? item.achievement_score.toLocaleString()
        : "-";
  } else if (type.includes("sharenian")) {
    value =
      "season_score" in item ? Number(item.season_score).toLocaleString() : "-";
  } else if (type === "root-of-time") {
    value = "max_damage" in item ? item.max_damage.toLocaleString() : "-";
  }

  return (
    <div className="flex gap-0.5">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-primary text-sm font-bold">{value}</span>
    </div>
  );
};
