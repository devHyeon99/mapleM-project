/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import type { UnifiedRankingItem } from "../model/types/unified-ranking";
import type { RankingType } from "../model/types/ranking";

interface MobileRankingCardProps {
  item: UnifiedRankingItem;
  type: RankingType;
  isWorldRankingView: boolean;
}

export const MobileRankingCard = ({
  item,
  type,
  isWorldRankingView,
}: MobileRankingCardProps) => {
  const isSharenian = type.includes("sharenian");
  const rank = isWorldRankingView ? item.worldRank : item.rank;

  return (
    <div className="flex items-center justify-between border-b p-4 last:border-0">
      <div className="flex items-center gap-4">
        {/* 1. 순위 섹션 */}
        <RankBadge rank={rank} />

        {/* 2. 정보 섹션 (타입에 따라 분기) */}
        <div className="flex flex-col">
          {isSharenian ? (
            <SharenianInfo item={item} />
          ) : (
            <GeneralInfo item={item} />
          )}
        </div>
      </div>

      {/* 3. 스탯 섹션 */}
      <StatBadge label={item.mainStat.label} value={item.mainStat.value} />
    </div>
  );
};

// ----------------------------------------------------------------------
// 하위 컴포넌트 (Sub-components)
// ----------------------------------------------------------------------

/** 순위 표시 컴포넌트 */
const RankBadge = ({ rank }: { rank: number }) => (
  <div className="flex w-8 flex-col items-center justify-center">
    <span className="text-foreground text-lg font-bold">{rank}</span>
  </div>
);

/** 우측 스탯 표시 컴포넌트 */
const StatBadge = ({
  label,
  value,
}: {
  label?: string;
  value: string | number;
}) => (
  <div className="flex flex-row items-end gap-0.5">
    <span className="text-muted-foreground text-xs">{label}</span>
    <span className="text-primary text-sm font-bold">{value}</span>
  </div>
);

/** 공통 아이콘 컴포넌트 (중복 제거) */
const RankingIcon = ({
  src,
  alt,
  className,
  pixelated = false,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  pixelated?: boolean;
}) => {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-contain", className)}
      style={pixelated ? { imageRendering: "pixelated" } : undefined}
    />
  );
};

/** 샤레니안 랭킹 정보 (길드 중심) */
const SharenianInfo = ({ item }: { item: UnifiedRankingItem }) => (
  <>
    {/* 길드 마크 + 길드명 */}
    <div className="flex items-center gap-1">
      <RankingIcon
        src={item.subIdentity.icon || `/worlds/${item.worldName}.png`}
        alt="guild mark"
        className="h-4 w-4 rounded-xs"
      />
      <span className="text-sm font-bold">{item.identity.name}</span>
    </div>

    {/* 월드 아이콘 + 월드명 */}
    <div className="text-muted-foreground mt-0.5 flex items-center gap-[5px] text-xs">
      <RankingIcon
        src={`/worlds/${item.worldName}.png`}
        alt={item.worldName}
        className="h-3.5 w-3.5"
        pixelated
      />
      <span className="self-end leading-3">{item.worldName}</span>
    </div>
  </>
);

/** 일반 랭킹 정보 (캐릭터 중심) */
const GeneralInfo = ({ item }: { item: UnifiedRankingItem }) => {
  const hasJobIcon = !!item.subIdentity.icon;
  const hasExtraInfo = !!item.extraInfo.text;

  return (
    <>
      {/* 월드 아이콘 + 닉네임 */}
      <div className="flex items-center gap-1.5">
        <RankingIcon
          src={`/worlds/${item.worldName}.png`}
          alt={item.worldName}
          className="h-3.5 w-3.5"
          pixelated
        />
        <Link
          href={`/character/${item.worldName}/${item.identity.name}`}
          className="text-sm font-bold hover:underline"
        >
          {item.identity.name}
        </Link>
      </div>

      {/* 직업 아이콘/명 + 구분선 + 길드 정보 */}
      <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
        <RankingIcon
          src={item.subIdentity.icon}
          alt={item.subIdentity.text}
          className="h-auto w-3.5"
        />
        <span className={cn(hasJobIcon && "self-end leading-none")}>
          {item.subIdentity.text}
        </span>

        {hasExtraInfo && (
          <>
            <span className="h-2.5 w-[1px] bg-black/50 dark:bg-white/50" />
            <span className="flex items-center gap-1">
              <RankingIcon
                src={item.extraInfo.imageUrl}
                alt={item.worldName}
                className="h-3.5 w-3.5"
                pixelated
              />
              <span className="max-w-[100px]">{item.extraInfo.text}</span>
            </span>
          </>
        )}
      </div>
    </>
  );
};
