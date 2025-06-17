/** 개별 링크 스킬 정보 */
export interface LinkSkillInfo {
  /** 스킬 이름 */
  skill_name: string;
  /** 현재 스킬 레벨 */
  skill_level: number;
  /** 스킬 설명 */
  skill_description: string;
  /** 현재 스킬 효과 */
  skill_effect: string;
  /** 다음 레벨에서의 효과 (없을 수 있음) */
  skill_effect_next: string;
  /** 아이콘 이미지 URL */
  skill_icon: string;
}

/** 링크 스킬 프리셋 */
export interface LinkSkillPreset {
  /** 프리셋 번호 */
  preset_no: number;
  /** 해당 프리셋에 장착된 링크 스킬들 */
  link_skill_info: LinkSkillInfo[];
}

/** 링크 스킬 전체 응답 */
export interface LinkSkillResponse {
  /** 현재 사용 중인 프리셋 번호 */
  use_prest_no: number;
  /** 프리셋 리스트 */
  link_skill: LinkSkillPreset[];
}
