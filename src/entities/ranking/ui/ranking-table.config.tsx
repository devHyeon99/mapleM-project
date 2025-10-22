import React from "react";
import Link from "next/link";
import type { AnyRankingData } from "../model/types/ranking";
import { RankingIcon } from "./RankingIcon";

// ----------------------------------------------------------------------
// 타입 정의 및 헬퍼
// ----------------------------------------------------------------------

export interface RankingTableContext {
  isWorldRankingView: boolean;
}

export interface ColumnDef {
  header: string;
  className?: string;
  cell: (item: AnyRankingData, ctx: RankingTableContext) => React.ReactNode;
}

// ----------------------------------------------------------------------
// 셀 렌더러 (Renderers)
// MobileRankingList에서도 쓸 수 있게 export const로 선언
// ----------------------------------------------------------------------

export const Renderers = {
  // [순위]
  Rank: (item: AnyRankingData, ctx: RankingTableContext) => (
    <span className="text-foreground font-bold">
      {ctx.isWorldRankingView ? item.world_ranking : item.ranking}
    </span>
  ),

  // [월드]
  World: (item: AnyRankingData) => (
    <span className="text-foreground text-sm font-medium">
      {item.world_name}
    </span>
  ),

  // [식별자] 캐릭터명 또는 길드명
  Identity: (item: AnyRankingData) => {
    // 1. 캐릭터 랭킹 (이미지 없이 텍스트만 깔끔하게)
    if ("character_name" in item) {
      return (
        <Link
          href={`/character/${item.world_name}/${item.character_name}`}
          className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
        >
          {item.character_name}
        </Link>
      );
    }
    // 2. 길드 랭킹 (길드 마크 + 이름)
    if ("guild_name" in item && !("character_name" in item)) {
      return (
        <div className="flex items-center justify-center gap-2">
          {item.guild_mark_icon && (
            <RankingIcon
              src={item.guild_mark_icon}
              alt="guild mark"
              className="h-5 w-5 rounded-xs bg-white"
              size={20}
            />
          )}
          <Link
            href={`/guild/${item.world_name}/${item.guild_name}`}
            className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
          >
            {item.guild_name}
          </Link>
        </div>
      );
    }
    return <span>-</span>;
  },

  // [직업]
  Job: (item: AnyRankingData) => {
    if ("character_class" in item) {
      return (
        <span className="text-muted-foreground text-sm font-medium">
          {item.character_class}
        </span>
      );
    }
    return <span className="text-muted-foreground text-sm">-</span>;
  },

  // [메인 스탯]
  MainStat: (item: AnyRankingData) => {
    let value = "-";
    if ("character_combat_power" in item)
      value = item.character_combat_power.toLocaleString();
    else if ("dojang_floor" in item) value = `${item.dojang_floor}층`;
    else if ("tower_floor" in item) value = `${item.tower_floor}층`;
    else if ("max_damage" in item) value = item.max_damage.toLocaleString();
    else if ("season_score" in item)
      value = Number(item.season_score).toLocaleString();
    else if ("achievement_score" in item)
      value = item.achievement_score.toLocaleString();
    else if ("union_level" in item)
      value = `Lv.${item.union_level.toLocaleString()}`;
    else if ("character_level" in item) value = `Lv.${item.character_level}`;

    return <span className="text-sm font-bold">{value}</span>;
  },

  // [서브 정보]
  SubInfo: (item: AnyRankingData) => {
    // 1. 길드 랭킹 -> 마스터 이름
    if ("guild_master_name" in item) {
      return (
        <Link
          href={`/character/${item.world_name}/${item.guild_master_name}`}
          className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
        >
          {item.guild_master_name}
        </Link>
      );
    }
    // 2. 유니온/업적 -> 등급 (아이콘 + 텍스트)
    if ("union_grade" in item) {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm font-medium">{item.union_grade}</span>
        </div>
      );
    }
    if ("achievement_grade_name" in item) {
      return (
        <div className="flex items-center justify-center gap-1">
          <span className="text-sm font-medium">
            {item.achievement_grade_name}
          </span>
        </div>
      );
    }
    // 3. 일반 캐릭터 -> 길드명
    if ("guild_name" in item) {
      const guildIcon = "guild_mark_icon" in item ? item.guild_mark_icon : null;

      return item.guild_name ? (
        <div className="flex items-center justify-center gap-1.5">
          {/* 길드 마크가 있으면 표시 */}
          {guildIcon && (
            <RankingIcon
              src={guildIcon}
              alt="guild mark"
              className="h-5 w-5 rounded-xs bg-white"
              size={20}
            />
          )}

          <Link
            href={`/guild/${item.world_name}/${item.guild_name}`}
            className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
          >
            {item.guild_name}
          </Link>
        </div>
      ) : (
        <span className="text-muted-foreground text-xs">-</span>
      );
    }
    return <span className="text-muted-foreground text-xs">-</span>;
  },

  // 뱃지 정보 (업적 랭킹용)
  Badge: (item: AnyRankingData) => {
    if ("main_honor_badge" in item && item.main_honor_badge) {
      return (
        <div className="flex items-center justify-center gap-1">
          {item.main_honor_badge.slice(0, 3).map((badge) => (
            <div key={badge.badge_no} className="group relative">
              <RankingIcon
                src={badge.badge_icon}
                alt="업적 뱃지"
                className="bg-background h-8 w-8 rounded-full border border-white"
                size={32}
              />
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-muted-foreground text-xs">-</span>;
  },

  // 등급 아이콘 (샤레니안 전용)
  Grade: (item: AnyRankingData) => {
    if ("grade_icon" in item && item.grade_icon) {
      return (
        <div className="flex items-center justify-center">
          <RankingIcon
            src={item.grade_icon}
            alt="길드 등급"
            className="h-8 w-8 object-contain" // 아이콘 크기 조절
            size={32}
          />
        </div>
      );
    }
    return <span className="text-muted-foreground text-xs">-</span>;
  },
};

// ----------------------------------------------------------------------
// 3. 컬럼 설정 (Config)
// ----------------------------------------------------------------------

const createCommonColumns = (mainStatHeader: string): ColumnDef[] => [
  { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
  { header: "월드", className: "w-[80px]", cell: Renderers.World },
  { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
  { header: "직업", className: "w-[120px]", cell: Renderers.Job },
  { header: mainStatHeader, className: "w-[120px]", cell: Renderers.MainStat },
  { header: "길드", className: "w-[120px]", cell: Renderers.SubInfo },
];

export const RANKING_COLUMNS: Record<string, ColumnDef[]> = {
  // 일반 캐릭터 랭킹
  level: createCommonColumns("레벨"),
  dojang: createCommonColumns("무릉 층수"),
  "root-of-time": createCommonColumns("점수"),
  "combat-power": createCommonColumns("전투력"),
  "kerning-m-tower": createCommonColumns("타워 층수"),

  // 유니온
  union: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
    {
      header: "길드",
      className: "w-[120px]",
      cell: (item) =>
        "guild_name" in item ? (
          <Link
            href={`/guild/${item.world_name}/${item.guild_name}`}
            className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
          >
            {item.guild_name}
          </Link>
        ) : (
          <span></span>
        ),
    },
    {
      header: "유니온 레벨",
      className: "w-[100px]",
      cell: Renderers.MainStat,
    },
    { header: "등급", className: "w-[120px]", cell: Renderers.SubInfo },
  ],

  // 업적
  achievement: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
    { header: "업적 점수", className: "w-[100px]", cell: Renderers.MainStat },
    { header: "등급", className: "w-[120px]", cell: Renderers.SubInfo },
    {
      header: "대표 뱃지",
      className: "w-[120px] hidden md:table-cell",
      cell: Renderers.Badge,
    },
  ],

  // 샤레니안 (길드)
  sharenian: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "길드", className: "w-[150px]", cell: Renderers.Identity },
    { header: "마스터", className: "w-[120px]", cell: Renderers.SubInfo },
    { header: "점수", className: "w-[120px]", cell: Renderers.MainStat },
    { header: "등급", className: "w-[80px]", cell: Renderers.Grade },
  ],
};
