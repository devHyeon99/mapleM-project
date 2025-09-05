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

export interface UnionBlockPosition {
  cell_no: string;
  cell_x: number | null;
  cell_y: number | null;
}

export interface UnionRaiderBlock {
  /** 블록 랭크 (0:B, 1:A, 2:S, 3:SS, 4:SSS) */
  block_rank: string;
  /** 블록 타입 (0:공통, 1:전사, 2:궁수, 3:도적, 4:마법사, 5:해적) */
  block_type: string;
  block_position: UnionBlockPosition[];
}

export interface UnionBattleMap {
  preset_no: number;
  option_setting: {
    option_name_1: string;
    option_name_2: string;
    option_name_3: string;
    option_name_4: string;
    option_name_5: string;
    option_name_6: string;
    option_name_7: string;
    option_name_8: string;
  };
  union_raider: UnionRaiderBlock[];
}

export interface CharacterUnionRaider {
  use_preset_no: number;
  use_union_occupied_option: UnionOption[];
  use_union_raider_option: UnionOption[];
  battle_map: UnionBattleMap[];
}

export type CharacterUnionRaiderResponse = CharacterUnionRaider;
