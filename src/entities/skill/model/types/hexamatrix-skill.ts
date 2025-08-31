/**
 * HEXA 매트릭스의 개별 코어 정보
 */
export interface HexaMatrixSkill {
  /** 슬롯 번호 (1, 2, 3...) */
  slot_no: number;

  /** 코어 레벨 (1~10) */
  slot_level: number;

  /** 코어 유형 ('스킬 코어' | '마스터리 코어' | '강화 코어') */
  skill_type: "스킬 코어" | "마스터리 코어" | "강화 코어";

  /** 스킬 이름 */
  skill_name: string;

  /** 스킬 설명 */
  skill_description: string;

  /** 스킬 아이콘 URL */
  skill_icon: string;
}

/**
 * 캐릭터의 HEXA 매트릭스 전체 데이터
 */
export interface CharacterHexaMatrixSkill {
  /** HEXA 매트릭스 코어 목록 */
  hexamatrix_skill: HexaMatrixSkill[];
}
