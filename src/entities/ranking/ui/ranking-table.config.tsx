/* eslint-disable @next/next/no-img-element */
import React from "react";
import type { UnifiedRankingItem } from "../model/types/unified-ranking";
import { cn } from "@/shared/lib/utils"; // cn 유틸 활용
import Link from "next/link";

export interface RankingTableContext {
  isWorldRankingView: boolean;
}

export interface ColumnDef {
  header: string;
  className: string;
  cell: (item: UnifiedRankingItem, ctx: RankingTableContext) => React.ReactNode;
}

// 이미지 렌더링을 담당하는 내부 헬퍼 컴포넌트
// 반복되는 onError, cn, null 체크 로직을 한곳으로 모음
const RankingIcon = ({
  src,
  alt = "icon",
  className,
}: {
  src?: string | null;
  alt?: string;
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

// ----------------------------------------------------------------------
// 2. 셀 렌더러 (Cell Renderers) - 코드가 훨씬 간결해짐
// ----------------------------------------------------------------------

const Renderers = {
  Rank: (item: UnifiedRankingItem, ctx: RankingTableContext) => (
    <span className="text-lg font-bold">
      {ctx.isWorldRankingView ? item.worldRank : item.rank}
    </span>
  ),

  World: (item: UnifiedRankingItem) => (
    <div className="flex items-center justify-center gap-1.5">
      <span className="text-sm">{item.worldName}</span>
    </div>
  ),

  Identity: (item: UnifiedRankingItem) => (
    <div className="flex items-center justify-center gap-1.5">
      <RankingIcon
        src={`/worlds/${item.worldName}.png`}
        alt={item.worldName}
        className="h-3.5 w-3.5"
      />
      <Link
        href={`/character/${item.worldName}/${item.identity.name}`}
        className="max-w-[120px] truncate text-sm font-semibold underline-offset-4 hover:underline"
      >
        {item.identity.name}
      </Link>
    </div>
  ),

  GuildInfo: (item: UnifiedRankingItem) => (
    <div className="flex items-center justify-center gap-1.5">
      <RankingIcon
        src={item.subIdentity.icon}
        alt="guild mark"
        className="h-5 w-5 rounded-xs object-contain"
      />
      <span className="text-sm font-semibold">{item.identity.name}</span>
    </div>
  ),

  MainStat: (item: UnifiedRankingItem) => (
    <span className="font-bold">
      {item.mainStat.label && (
        <span className="mr-0.5 text-xs font-normal">
          {item.mainStat.label}
        </span>
      )}
      {item.mainStat.value}
    </span>
  ),

  SubIdentity: (item: UnifiedRankingItem) => (
    <div className="flex items-center justify-center gap-1.5">
      <RankingIcon src={item.subIdentity.icon} className="h-7 w-auto" />
      <span className="max-w-[100px] truncate text-sm">
        {item.subIdentity.text || "-"}
      </span>
    </div>
  ),

  ExtraInfo: (item: UnifiedRankingItem) => {
    // 뱃지 리스트
    if (item.extraInfo.type === "badge" && item.extraInfo.badges) {
      return (
        <div className="flex justify-center gap-1">
          {item.extraInfo.badges.slice(0, 3).map((badge) => (
            <RankingIcon
              key={badge.badge_no}
              src={badge.badge_icon}
              alt={badge.badge_name}
              className="z-0 h-8 w-8 rounded-full border bg-white hover:z-10"
            />
          ))}
        </div>
      );
    }

    // [최적화 2] 나머지 케이스들을 통합하여 중복 제거
    // 유니온, 샤레니안, 일반 길드 모두 "아이콘 + 텍스트" 구조임
    const iconClassMap = {
      "guild-sharenian": "h-8 w-8 rounded-xs",
      union: "h-auto w-9 rounded-xs",
      default: "h-5 w-5 rounded-xs bg-white/80",
    };

    // 타입 단언을 사용하여 안전하게 키 접근 (또는 default fallback)
    const imgClass =
      iconClassMap[item.extraInfo.type as keyof typeof iconClassMap] ||
      iconClassMap.default;

    return (
      <div className="flex items-center justify-center gap-1.5">
        <RankingIcon src={item.extraInfo.imageUrl} className={imgClass} />
        {/* 텍스트가 있을 때만 렌더링 (샤레니안 일부 케이스 등) */}
        {item.extraInfo.text && (
          <span className="max-w-[100px] text-sm">{item.extraInfo.text}</span>
        )}
      </div>
    );
  },
};

// ----------------------------------------------------------------------
// 3. 컬럼 생성 팩토리 (Factory Pattern) - 중복 제거의 핵심
// ----------------------------------------------------------------------

/**
 * 기본 캐릭터 랭킹 테이블 구조를 생성합니다.
 * (순위 -> 캐릭터 -> 직업 -> [가변 스탯] -> [가변 기타정보])
 * @param mainStatHeader 메인 스탯 컬럼의 헤더 이름 (예: "레벨", "전투력")
 * @param extraInfoHeader 마지막 기타 정보 컬럼의 헤더 이름 (기본값: "길드")
 */
const createCommonColumns = (
  mainStatHeader: string,
  extraInfoHeader: string = "길드",
): ColumnDef[] => [
  { header: "순위", className: "w-[50px]", cell: Renderers.Rank },
  { header: "캐릭터", className: "w-[100px]", cell: Renderers.Identity },
  { header: "직업", className: "w-[100px]", cell: Renderers.SubIdentity },
  { header: mainStatHeader, className: "w-[100px]", cell: Renderers.MainStat },
  {
    header: extraInfoHeader,
    className: "w-[100px]",
    cell: Renderers.ExtraInfo,
  },
];

// ----------------------------------------------------------------------
// 4. 최종 설정 객체
// ----------------------------------------------------------------------

export const RANKING_COLUMNS: Record<string, ColumnDef[]> = {
  // 1. 공통 패턴 적용 (팩토리 함수 사용)
  level: createCommonColumns("레벨"),
  dojang: createCommonColumns("무릉 층수"),
  "root-of-time": createCommonColumns("점수"),
  "combat-power": createCommonColumns("전투력"),
  "kerning-m-tower": createCommonColumns("타워 층수"),

  // 2. 유니온 (마지막 컬럼이 '유니온 등급')
  union: createCommonColumns("유니온 레벨", "유니온 등급"),

  // 3. 업적 (컬럼 순서/구성이 약간 다름: 직업 대신 등급이 중간에 옴)
  achievement: [
    { header: "순위", className: "w-[50px]", cell: Renderers.Rank },
    { header: "캐릭터", className: "w-[100px]", cell: Renderers.Identity },
    { header: "업적 점수", className: "w-[100px]", cell: Renderers.MainStat },
    { header: "등급", className: "w-[100px]", cell: Renderers.SubIdentity }, // SubIdentity가 등급
    { header: "대표 뱃지", className: "w-[10px]", cell: Renderers.ExtraInfo },
  ],

  // 4. 샤레니안 (길드 기반이라 구조가 완전히 다름)
  sharenian: [
    { header: "순위", className: "w-[80px]", cell: Renderers.Rank },
    { header: "월드", className: "w-[100px]", cell: Renderers.World },
    {
      header: "길드",
      className: "w-[150px]",
      cell: Renderers.GuildInfo,
    },
    {
      header: "길드 마스터",
      className: "w-[120px]",
      cell: Renderers.Identity,
    },
    { header: "시즌 점수", className: "w-[120px]", cell: Renderers.MainStat },
    { header: "등급", className: "w-[100px]", cell: Renderers.ExtraInfo },
  ],
};
