/**
 * 유니온 기본 요약 정보
 */
export interface CharacterUnion {
  union_level: number | null;
  union_grade: string | null;
  union_level_total_option: string | null;
  union_grade_icon: string | null;
}

export type CharacterUnionResponse = CharacterUnion;

/**
 * 유니온 공격대(Raider) 상세 정보
 */
export interface UnionOption {
  option_name: string;
  option_value: string;
}

export interface CharacterUnionRaider {
  use_union_raider_option: UnionOption[];
}

export type CharacterUnionRaiderResponse = CharacterUnionRaider;
