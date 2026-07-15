import { formatKoreanNumber } from "../lib/format-korean-number";
import type { AnyRankingData, RankingHighlight } from "../model/types/ranking";
import { RankingIcon } from "./RankingIcon";
import { LinkText, renderGuildInfo } from "./ranking-table.links";
import { characterHref } from "@/shared/lib/url";

export interface RankingTableContext {
  addCharacterHistory: (name: string, world: string) => void;
  isWorldRankingView: boolean;
  highlight?: RankingHighlight | null;
}

/** 검색으로 찾은 행 강조. 다크/라이트 양쪽에서 통하는 톤으로 배경만 얹는다. */
export const HIGHLIGHT_ROW_CLASS = "bg-orange-500/15 hover:bg-orange-500/20!";

/** 검색으로 찾은 캐릭터의 행인지 판단한다. 캐릭터가 없는 랭킹(샤레니안)은 항상 false. */
export const isHighlightedRow = (
  item: AnyRankingData,
  ctx: RankingTableContext,
): boolean =>
  !!ctx.highlight &&
  "character_name" in item &&
  item.world_name === ctx.highlight.worldName &&
  item.character_name === ctx.highlight.characterName;

const getMainStatValue = (item: AnyRankingData): string => {
  // 전투력·최대 데미지는 자릿수가 커서 쉼표만으로는 규모가 안 잡힘
  if ("character_combat_power" in item)
    return formatKoreanNumber(item.character_combat_power);
  if ("dojang_floor" in item) return `${item.dojang_floor}층`;
  if ("tower_floor" in item) return `${item.tower_floor}층`;
  if ("max_damage" in item) return formatKoreanNumber(item.max_damage);
  if ("season_score" in item) return Number(item.season_score).toLocaleString();
  if ("achievement_score" in item)
    return item.achievement_score.toLocaleString();
  if ("union_level" in item) return `${item.union_level.toLocaleString()}`;
  if ("character_level" in item) return `Lv.${item.character_level}`;
  return "-";
};

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
  Identity: (item: AnyRankingData, ctx: RankingTableContext) => {
    // 캐릭터
    if ("character_name" in item) {
      return (
        <LinkText
          href={characterHref(item.world_name, item.character_name)}
          onNavigate={() =>
            ctx.addCharacterHistory(item.character_name, item.world_name)
          }
        >
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
  SubInfo: (item: AnyRankingData, ctx: RankingTableContext) => {
    // 길드 랭킹 -> 길드 마스터
    if ("guild_master_name" in item) {
      return (
        <LinkText
          href={characterHref(item.world_name, item.guild_master_name)}
          onNavigate={() =>
            ctx.addCharacterHistory(item.guild_master_name, item.world_name)
          }
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
