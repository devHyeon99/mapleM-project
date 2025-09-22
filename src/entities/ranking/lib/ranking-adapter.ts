import type {
  RankingType,
  AnyRankingData,
  LevelRanking,
  DojangRanking,
  UnionRanking,
  AchievementRanking,
  SharenianRanking,
  RootOfTimeRanking,
  CombatPowerRanking,
  KerningMTowerRanking,
} from "../model/types/ranking";
import type { UnifiedRankingItem } from "../model/types/unified-ranking";

// 헬퍼: ID 생성기
const generateId = (item: AnyRankingData, type: string) =>
  `${type}-${item.date}-${item.ranking}-${item.world_name}`;

/**
 * 팩토리 함수: 랭킹 타입에 맞는 어댑터를 실행하여 통일된 데이터를 반환합니다.
 */
export function adaptRankingItem(
  type: RankingType,
  item: AnyRankingData,
): UnifiedRankingItem {
  switch (type) {
    case "level":
      return adaptLevel(item as LevelRanking);
    case "dojang":
      return adaptDojang(item as DojangRanking);
    case "root-of-time":
      return adaptRootOfTime(item as RootOfTimeRanking);
    case "union":
      return adaptUnion(item as UnionRanking);
    case "combat-power":
      return adaptCombatPower(item as CombatPowerRanking);
    case "kerning-m-tower":
      return adaptKerning(item as KerningMTowerRanking);
    case "achievement":
      return adaptAchievement(item as AchievementRanking);
    case "sharenian-battlefield":
    case "sharenian-waterway":
      return adaptSharenian(item as SharenianRanking, type);
    default:
      throw new Error(`지원하지 않는 랭킹 타입입니다: ${type}`);
  }
}

// --- 개별 어댑터 구현 ---

const adaptLevel = (item: LevelRanking): UnifiedRankingItem => ({
  id: generateId(item, "level"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  subIdentity: { text: item.character_class },
  mainStat: { value: item.character_level, label: "Lv." },
  // LevelSpec에는 guild_mark_icon이 있음
  extraInfo: {
    type: "guild",
    text: item.guild_name ?? undefined,
    imageUrl: item.guild_mark_icon,
  },
});

const adaptDojang = (item: DojangRanking): UnifiedRankingItem => ({
  id: generateId(item, "dojang"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  subIdentity: { text: item.character_class },
  mainStat: { value: `${item.dojang_floor}층` },
  // DojangSpec에는 guild_mark_icon이 없음 (타입 정의 준수)
  extraInfo: {
    type: "guild",
    text: item.guild_name ?? undefined,
    // imageUrl 없음
  },
});

const adaptRootOfTime = (item: RootOfTimeRanking): UnifiedRankingItem => ({
  id: generateId(item, "root"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  subIdentity: { text: item.character_class },
  mainStat: { value: `${item.max_damage.toLocaleString()}` },
  extraInfo: { type: "guild", text: item.guild_name ?? undefined },
});

const adaptCombatPower = (item: CombatPowerRanking): UnifiedRankingItem => ({
  id: generateId(item, "cp"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  subIdentity: { text: item.character_class },
  mainStat: { value: item.character_combat_power.toLocaleString() },
  extraInfo: { type: "guild", text: item.guild_name ?? undefined },
});

const adaptKerning = (item: KerningMTowerRanking): UnifiedRankingItem => ({
  id: generateId(item, "kerning"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  subIdentity: { text: item.character_class },
  mainStat: { value: `${item.tower_floor}층` },
  extraInfo: { type: "guild", text: item.guild_name ?? undefined },
});

const adaptUnion = (item: UnionRanking): UnifiedRankingItem => ({
  id: generateId(item, "union"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  subIdentity: { text: item.character_class },
  mainStat: { value: item.union_level.toLocaleString(), label: "" },
  // 유니온은 ExtraInfo에 등급 아이콘을 보여줌
  extraInfo: {
    type: "union",
    text: item.union_grade,
    imageUrl: item.union_grade_icon,
  },
});

const adaptAchievement = (item: AchievementRanking): UnifiedRankingItem => ({
  id: generateId(item, "achieve"),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  identity: { name: item.character_name, type: "character" },
  // 업적 랭킹은 직업 정보(CharacterDetails)가 없음 -> 등급명으로 대체하거나 비움
  subIdentity: {
    text: item.achievement_grade_name,
    icon: item.achievement_grade_icon, // JSON에 있는 아이콘 URL 연결
  },
  mainStat: { value: item.achievement_score.toLocaleString() },
  // 업적은 뱃지 리스트를 보여줌
  extraInfo: {
    type: "badge",
    badges: item.main_honor_badge,
  },
});

const adaptSharenian = (
  item: SharenianRanking,
  type: string,
): UnifiedRankingItem => ({
  id: generateId(item, type),
  rank: item.ranking,
  worldRank: item.world_ranking,
  worldName: item.world_name,
  // 길드 랭킹이므로 주체가 길드
  identity: { name: item.guild_name, type: "guild" },
  // 부가 정보는 길드 마스터
  subIdentity: {
    text: item.guild_master_name,
    // [수정] null이 들어오면 undefined로 변환하여 타입 불일치 해결
    icon: item.guild_mark_icon ?? undefined,
  },
  mainStat: { value: Number(item.season_score).toLocaleString() },
  // ExtraInfo에 길드 등급 아이콘 표시
  extraInfo: {
    type: "guild-sharenian",
    // 여기도 마찬가지로 null 처리
    imageUrl: item.grade_icon ?? undefined,
  },
});
