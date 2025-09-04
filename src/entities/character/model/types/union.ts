export interface CharacterUnion {
  union_level: number | null;
  union_grade: string | null;
  union_level_total_option: string | null;
  union_grade_icon: string | null;
}

export type CharacterUnionResponse = CharacterUnion;
