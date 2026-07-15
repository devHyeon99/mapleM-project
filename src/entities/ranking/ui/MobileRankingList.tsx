"use client";

import Link from "next/link";
import { formatKoreanNumber } from "../lib/format-korean-number";
import type { RankingType, AnyRankingData } from "../model/types/ranking";
import {
  HIGHLIGHT_ROW_CLASS,
  isHighlightedRow,
  Renderers,
} from "./ranking-table.renderers";
import type { RankingTableContext } from "./ranking-table.renderers";
import { memo } from "react";
import { RankingIcon } from "./RankingIcon";
import { worldIconSrc } from "@/shared/config/constants/worlds";
import { characterHref, guildHref } from "@/shared/lib/url";
import { cn } from "@/shared/lib/utils";

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
      // 자릿수가 커서 쉼표만으로는 규모가 안 잡힘
      if ("character_combat_power" in item)
        value = formatKoreanNumber(item.character_combat_power);
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
      // 조 단위까지 가므로 쉼표보다 단위 끊기가 읽힘
      if ("max_damage" in item) value = formatKoreanNumber(item.max_damage);
      break;
    default:
      if (type.includes("sharenian") && "season_score" in item) {
        value = Number(item.season_score).toLocaleString();
      }
      break;
  }

  return { label, value };
};

/** 숫자만으로는 읽히지 않는 랭킹(유니온·업적)의 등급 */
const getStatGrade = (item: AnyRankingData): string | null => {
  if ("union_grade" in item) return item.union_grade;
  if ("achievement_grade_name" in item) return item.achievement_grade_name;
  return null;
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
    <ul className="bg-background flex flex-col divide-y border-b">
      {/* 헤더 영역 */}
      <li
        aria-hidden="true"
        className="bg-secondary flex h-10 items-center gap-4 p-2 text-sm font-medium"
      >
        <span className="w-8 text-center">순위</span>
        <span className="w-8">정보</span>
      </li>

      {/* 리스트 영역 */}
      {data.map((item, index) => (
        <RankingRow
          key={getItemKey(item, type, index)}
          item={item}
          type={type}
          context={context}
        />
      ))}
    </ul>
  );
};

// 개별 랭킹
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
      // 개별 행을 li로 변경
      <li
        className={cn(
          "bg-card flex items-center gap-4 p-2",
          isHighlightedRow(item, context) && HIGHLIGHT_ROW_CLASS,
        )}
      >
        <div className="flex w-8 shrink-0 flex-col items-center justify-center">
          {/* 순위 정보에 대한 접근성 레이블 추가 */}
          <span
            className="text-foreground text-sm font-bold"
            aria-label={`순위: ${item.ranking}위`}
          >
            {Renderers.Rank(item, context)}
          </span>
        </div>

        {/* 값을 오른쪽 칸이 아니라 아랫줄에 배치. 시간의 근원처럼 조 단위까지 가는
            값이 이름·직업·길드와 가로 폭을 다투지 않게 함 */}
        <div className="flex min-w-0 flex-1 flex-col">
          {isSharenian ? (
            <SharenianInfo item={item} />
          ) : (
            <GeneralInfo item={item} context={context} />
          )}

          <StatDisplay item={item} type={type} />
        </div>
      </li>
    );
  },
);
RankingRow.displayName = "RankingRow";

// 샤레니안 랭킹 정보
const SharenianInfo = ({ item }: { item: AnyRankingData }) => {
  if (!("guild_name" in item)) return null;
  const guildMark = "guild_mark_icon" in item ? item.guild_mark_icon : null;

  return (
    <div className="flex min-w-0 items-center gap-1.5">
      {guildMark && (
        <RankingIcon
          src={guildMark}
          alt="guild mark"
          className="h-4 w-4 shrink-0 rounded-xs bg-white"
          size={16}
        />
      )}
      {item.guild_name && (
        <Link
          href={guildHref(item.world_name, item.guild_name)}
          prefetch={false}
          className="shrink-0 truncate text-sm font-bold"
        >
          {item.guild_name}
        </Link>
      )}

      <span className="text-muted-foreground truncate text-xs">
        {item.world_name}
      </span>
    </div>
  );
};

// 일반 랭킹 정보
const GeneralInfo = ({
  item,
  context,
}: {
  item: AnyRankingData;
  context: RankingTableContext;
}) => {
  if (!("character_name" in item)) return null;

  const jobName = "character_class" in item ? item.character_class : null;
  const guildName = "guild_name" in item ? item.guild_name : null;

  return (
    // 이름과 직업·길드를 한 줄에 배치. 이름을 먼저 지키고 뒤쪽부터 줄어들게 함
    <div className="flex min-w-0 items-center gap-1.5">
      <RankingIcon
        src={worldIconSrc(item.world_name)}
        alt={item.world_name}
        className="h-3.5 w-3.5 shrink-0"
        size={14}
      />
      <Link
        href={characterHref(item.world_name, item.character_name)}
        prefetch={false}
        onNavigate={() =>
          context.addCharacterHistory(item.character_name, item.world_name)
        }
        className="shrink-0 truncate text-sm font-bold"
      >
        {item.character_name}
      </Link>

      <span className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-xs">
        <span className="truncate">{jobName || ""}</span>

        {guildName && (
          <>
            <span className="bg-border h-2 w-[1px] shrink-0" />
            <Link
              href={guildHref(item.world_name, guildName)}
              prefetch={false}
              className="truncate"
            >
              {guildName}
            </Link>
          </>
        )}
      </span>
    </div>
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
  const grade = getStatGrade(item);

  return (
    <div className="mt-0.5 flex items-baseline gap-1.5">
      <span className="text-primary flex gap-0.5 text-sm font-bold">
        {label && <span>{label}</span>}
        <span>{value}</span>
      </span>

      {grade && (
        <span className="text-muted-foreground truncate text-xs">{grade}</span>
      )}
    </div>
  );
};
