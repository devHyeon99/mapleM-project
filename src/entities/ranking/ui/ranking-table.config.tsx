import React from "react";
import Link from "next/link";
import type { AnyRankingData } from "../model/types/ranking";
import { RankingIcon } from "./RankingIcon";

// ----------------------------------------------------------------------
// 타입 정의
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
// 공통 UI 컴포넌트 (내부 사용)
// ----------------------------------------------------------------------

const LinkText = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    prefetch={false}
    className="text-sm font-medium underline-offset-4 hover:text-orange-500 hover:underline"
  >
    {children}
  </Link>
);

const IconWithText = ({
  iconSrc,
  children,
}: {
  iconSrc?: string | null;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-center gap-1.5">
    {iconSrc && (
      <RankingIcon
        src={iconSrc}
        alt="icon"
        className="h-5 w-5 rounded-xs bg-white"
        size={20}
      />
    )}
    {children}
  </div>
);

// ----------------------------------------------------------------------
// 데이터 추출 헬퍼
// ----------------------------------------------------------------------

const getMainStatValue = (item: AnyRankingData): string => {
  if ("character_combat_power" in item)
    return item.character_combat_power.toLocaleString();
  if ("dojang_floor" in item) return `${item.dojang_floor}층`;
  if ("tower_floor" in item) return `${item.tower_floor}층`;
  if ("max_damage" in item) return item.max_damage.toLocaleString();
  if ("season_score" in item) return Number(item.season_score).toLocaleString();
  if ("achievement_score" in item)
    return item.achievement_score.toLocaleString();
  if ("union_level" in item) return `${item.union_level.toLocaleString()}`;
  if ("character_level" in item) return `Lv.${item.character_level}`;
  return "-";
};

// 길드 정보 렌더링 로직 (SubInfo와 Guild 렌더러에서 공통 사용)
const renderGuildInfo = (item: AnyRankingData) => {
  if ("guild_name" in item && item.guild_name) {
    const guildIcon = "guild_mark_icon" in item ? item.guild_mark_icon : null;
    return (
      <IconWithText iconSrc={guildIcon}>
        <LinkText href={`/guild/${item.world_name}/${item.guild_name}`}>
          {item.guild_name}
        </LinkText>
      </IconWithText>
    );
  }
  return <span className="text-muted-foreground text-xs">-</span>;
};

// ----------------------------------------------------------------------
// 셀 렌더러 (Renderers)
// ----------------------------------------------------------------------

export const Renderers = {
  // 순위 표시
  Rank: (item: AnyRankingData, ctx: RankingTableContext) => (
    <span className="text-foreground font-bold">
      {ctx.isWorldRankingView ? item.world_ranking : item.ranking}
    </span>
  ),

  // 월드명 표시
  World: (item: AnyRankingData) => (
    <span className="text-foreground text-sm font-medium">
      {item.world_name}
    </span>
  ),

  // 캐릭터/길드 식별자
  Identity: (item: AnyRankingData) => {
    // 캐릭터
    if ("character_name" in item) {
      return (
        <LinkText href={`/character/${item.world_name}/${item.character_name}`}>
          {item.character_name}
        </LinkText>
      );
    }
    // 길드
    if ("guild_name" in item) {
      return renderGuildInfo(item);
    }
    return <span>-</span>;
  },

  // 직업 표시
  Job: (item: AnyRankingData) => {
    const jobName = "character_class" in item ? item.character_class : "-";
    return (
      <span className="text-muted-foreground text-sm font-medium">
        {jobName}
      </span>
    );
  },

  // 메인 스탯 표시
  MainStat: (item: AnyRankingData) => (
    <span className="text-sm font-bold">{getMainStatValue(item)}</span>
  ),

  // 길드 정보 전용 렌더러 (유니온 랭킹 등에서 사용)
  Guild: (item: AnyRankingData) => renderGuildInfo(item),

  // 서브 정보 (상황에 따라 우선순위 다름)
  SubInfo: (item: AnyRankingData) => {
    // 길드 랭킹 -> 길드 마스터
    if ("guild_master_name" in item) {
      return (
        <LinkText
          href={`/character/${item.world_name}/${item.guild_master_name}`}
        >
          {item.guild_master_name}
        </LinkText>
      );
    }

    // 유니온/업적 -> 등급 정보
    if ("union_grade" in item) {
      return <span className="text-sm font-medium">{item.union_grade}</span>;
    }

    // 업적 -> 등급 정보
    if ("achievement_grade_name" in item) {
      return (
        <span className="text-sm font-medium">
          {item.achievement_grade_name}
        </span>
      );
    }

    // 일반 캐릭터 -> 소속 길드 (기본값)
    return renderGuildInfo(item);
  },

  // 업적 뱃지 목록
  Badge: (item: AnyRankingData) => {
    if (!("main_honor_badge" in item) || !item.main_honor_badge) {
      return <span className="text-muted-foreground text-xs">-</span>;
    }

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
  },

  // 길드 등급 아이콘
  Grade: (item: AnyRankingData) => {
    if (!("grade_icon" in item) || !item.grade_icon) {
      return <span className="text-muted-foreground text-xs">-</span>;
    }

    return (
      <div className="flex items-center justify-center">
        <RankingIcon
          src={item.grade_icon}
          alt="길드 등급"
          className="h-8 w-8 object-contain"
          size={32}
        />
      </div>
    );
  },
};

// ----------------------------------------------------------------------
// 컬럼 정의 (Columns)
// ----------------------------------------------------------------------

const createBaseColumns = (statHeader: string): ColumnDef[] => [
  { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
  { header: "월드", className: "w-[80px]", cell: Renderers.World },
  { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
  { header: "직업", className: "w-[120px]", cell: Renderers.Job },
  { header: statHeader, className: "w-[120px]", cell: Renderers.MainStat },
  { header: "길드", className: "w-[120px]", cell: Renderers.SubInfo },
];

export const RANKING_COLUMNS: Record<string, ColumnDef[]> = {
  // 일반 랭킹
  level: createBaseColumns("레벨"),
  dojang: createBaseColumns("무릉 층수"),
  "root-of-time": createBaseColumns("점수"),
  "combat-power": createBaseColumns("전투력"),
  "kerning-m-tower": createBaseColumns("타워 층수"),

  // 유니온 랭킹
  union: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "캐릭터", className: "w-[150px]", cell: Renderers.Identity },
    // 길드 정보를 강제로 표시하기 위해 전용 Renderer 사용
    { header: "길드", className: "w-[120px]", cell: Renderers.Guild },
    {
      header: "유니온 레벨",
      className: "w-[100px]",
      cell: Renderers.MainStat,
    },
    // SubInfo는 유니온 등급(grade)을 우선 표시하므로 여기 사용
    { header: "등급", className: "w-[120px]", cell: Renderers.SubInfo },
  ],

  // 업적 랭킹
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

  // 샤레니안 랭킹
  sharenian: [
    { header: "순위", className: "w-[60px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[80px]", cell: Renderers.World },
    { header: "길드", className: "w-[150px]", cell: Renderers.Identity },
    { header: "마스터", className: "w-[120px]", cell: Renderers.SubInfo },
    { header: "점수", className: "w-[120px]", cell: Renderers.MainStat },
    { header: "등급", className: "w-[80px]", cell: Renderers.Grade },
  ],
};
