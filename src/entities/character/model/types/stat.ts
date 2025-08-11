// ==========================================
// 1. 스탯 (Stat) 관련 타입
// ==========================================

/** 개별 스탯 항목 (예: "물리 공격력", "1500") */
export interface CharacterStat {
  stat_name: string;
  stat_value: string;
}

/** 넥슨 API 원본 응답 구조 ({ stat: [...] }) */
export interface CharacterStatContainer {
  stat: CharacterStat[];
}

/** * 프론트엔드 훅(useCharacterStat)에서 사용할 최종 응답 타입
 * API: /api/characters/stat
 */
export interface CharacterStatResponse {
  stat: CharacterStatContainer;
}
