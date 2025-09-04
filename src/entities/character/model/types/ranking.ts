// ==========================================================================
// 1. 공통 랭킹 정보 (Base Interface)
// - 레벨, 무릉, 유니온 등 모든 랭킹 객체의 공통 필드
// ==========================================================================
export interface RankingBasic {
  date: string; // 랭킹 업데이트 일자 (KST)
  ranking: number; // 전체 월드 랭킹 순위
  world_ranking: number; // 소속 월드 랭킹 순위
  character_name: string; // 캐릭터 명
  world_name: string; // 월드 명
}

// ==========================================================================
// 2. 레벨 랭킹 (Level Ranking)
// ==========================================================================

/** 레벨 랭킹 개별 항목 객체 (Array Element) */
export interface LevelRanking extends RankingBasic {
  character_level: number;
  character_class: string;
  guild_name?: string | null;
  guild_mark_icon?: string | null;
}

/** 레벨 랭킹 API 응답 (Response Object) */
export interface CharacterLevelRankingResponse {
  ranking: LevelRanking[]; // ranking 키에 객체 배열이 담김
}

// ==========================================================================
// 3. 유니온 랭킹 (Union Ranking)
// ==========================================================================

/** 유니온 랭킹 개별 항목 객체 (Array Element) */
export interface UnionRanking extends RankingBasic {
  character_class: string;
  union_grade: string;
  union_grade_icon: string;
  union_level: number;
  guild_name?: string | null;
}

/** 유니온 랭킹 API 응답 (Response Object) */
export interface CharacterUnionRankingResponse {
  ranking: UnionRanking[]; // ranking 키에 객체 배열이 담김
}
