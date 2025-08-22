export interface LinkSkillInfo {
  skill_name: string; // 스킬 이름
  skill_level: number; // 현재 스킬 레벨
  skill_description: string; // 스킬 설명
  skill_effect: string; // 현재 스킬 효과
  skill_effect_next: string; // 다음 레벨에서의 효과 (없을 수 있음)
  skill_icon: string; // 아이콘 이미지 URL
}

export interface LinkSkillPreset {
  preset_no: number; // 프리셋 번호
  link_skill_info: LinkSkillInfo[]; // 해당 프리셋에 장착된 링크 스킬들
}

export interface LinkSkillResponse {
  use_prest_no: number; // 현재 사용 중인 프리셋 번호
  link_skill: LinkSkillPreset[]; // 프리셋 리스트
}
