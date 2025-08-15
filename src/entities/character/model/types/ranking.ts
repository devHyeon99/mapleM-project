// ==========================================================================
// 공통 랭킹 정보 (Base Interface)
// - 레벨, 무릉, 유니온 등 모든 랭킹에 공통적으로 들어가는 필드 정의
// ==========================================================================
export interface RankingBasicInfo {
  date: string; // 랭킹 업데이트 일자 (KST)
  ranking: number; // 전체 월드 랭킹 순위
  world_ranking: number; // 소속 월드 랭킹 순위
  character_name: string; // 캐릭터 명
  world_name: string; // 월드 명
}

// ==========================================================================
// 레벨 랭킹 (Level Ranking)
// ==========================================================================

// 레벨 랭킹 개별 항목 (공통 정보 + 레벨)
export interface LevelRankingInfo extends RankingBasicInfo {
  character_level: number;
  character_class: string;
  guild_name?: string | null;
  guild_mark_icon?: string | null;
}

// ==========================================================================
// 유니온 랭킹 (Union Ranking)
// ==========================================================================

export interface UnionRankingInfo extends RankingBasicInfo {
  character_class: string;
  union_grade: string;
  union_grade_icon: string;
  union_level: number;
  guild_name?: string | null;
}
