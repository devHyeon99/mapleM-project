/**
 * 기초 인프라 타입
 */
export interface BaseRanking {
  date: string; // 랭킹 업데이트 일자 (KST)
  ranking: number; // 전체 월드 랭킹 순위
  world_ranking: number; // 소속 월드 랭킹 순위
  world_name: string; // 월드 명
}

/**
 * 캐릭터 핵심 정보 (도메인별로 필요한 필드만 조립하기 위해 분분화)
 */
interface CharacterIdentity {
  character_name: string;
}

interface CharacterDetails extends CharacterIdentity {
  character_class: string;
  guild_name: string | null;
}

interface CharacterLevel {
  character_level: number;
}

/**
 * 랭킹 종류별 고유 스탯
 */
interface LevelSpec {
  guild_mark_icon: string | null;
}
interface DojangSpec {
  dojang_floor: number;
}
interface RootOfTimeSpec {
  max_damage: number;
}
interface CombatPowerSpec {
  character_combat_power: number;
}
interface KerningMTowerSpec {
  tower_floor: number;
}
interface UnionSpec {
  union_grade: string;
  union_grade_icon: string;
  union_level: number;
}
interface AchievementSpec {
  achievement_score: number;
  achievement_grade_name: string;
  achievement_grade_icon: string;
  main_honor_badge: AchievementBadge[];
}
export interface AchievementBadge {
  badge_no: number;
  badge_name: string;
  badge_option: string;
  badge_icon: string;
}

/**
 * 최종 타입 조립
 */

// 캐릭터 기반 (이름, 직업, 길드, 레벨 포함)
export interface LevelRanking
  extends BaseRanking,
    CharacterDetails,
    CharacterLevel,
    LevelSpec {}
export interface DojangRanking
  extends BaseRanking,
    CharacterDetails,
    CharacterLevel,
    DojangSpec {}
export interface RootOfTimeRanking
  extends BaseRanking,
    CharacterDetails,
    CharacterLevel,
    RootOfTimeSpec {}
export interface CombatPowerRanking
  extends BaseRanking,
    CharacterDetails,
    CharacterLevel,
    CombatPowerSpec {}
export interface KerningMTowerRanking
  extends BaseRanking,
    CharacterDetails,
    CharacterLevel,
    KerningMTowerSpec {}

// 특수 캐릭터 기반 (레벨 제외 또는 이름만 포함)
export interface UnionRanking
  extends BaseRanking,
    CharacterDetails,
    UnionSpec {} // 레벨 제외
export interface AchievementRanking
  extends BaseRanking,
    CharacterIdentity,
    AchievementSpec {} // 이름만 포함

// 길드 기반 (캐릭터 정보 없음)
export interface SharenianRanking extends BaseRanking {
  guild_name: string;
  guild_master_name: string;
  guild_mark_icon: string | null;
  season_score: string;
  grade_icon: string | null;
}

/**
 * 통합 관리 및 유틸리티
 */
export const RANKING_TYPES = [
  "level",
  "dojang",
  "root-of-time",
  "union",
  "combat-power",
  "kerning-m-tower",
  "achievement",
  "sharenian-battlefield",
  "sharenian-waterway",
] as const;

export type RankingType = (typeof RANKING_TYPES)[number];

export interface RankingResponse<T> {
  ranking: T[];
}

export type AnyRankingData =
  | LevelRanking
  | DojangRanking
  | RootOfTimeRanking
  | UnionRanking
  | CombatPowerRanking
  | KerningMTowerRanking
  | AchievementRanking
  | SharenianRanking;
