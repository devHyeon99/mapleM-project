// 장착된 개별 스킬
export interface CharacterEquipmentSkill {
  skill_mode: number; // 스킬 모드 (공식 문서상 number)
  equipment_skill_set: string; // 장비 스킬 세트 번호
  slot_id: string; // 슬롯 ID
  skill_name: string; // 스킬 이름 (ex. "Lv.30 스킬명")
  skill_type: string; // 스킬 타입
  skill_grade: string; // 스킬 등급
  add_feature_flag: string; // 추가 플래그
}

// 프리셋
export interface CharacterSkillPreset {
  preset_slot_no: number; // 프리셋 번호
  skill_name_1: string; // 1번 슬롯 스킬 이름
  skill_name_2: string; // 2번 슬롯 스킬 이름
  skill_name_3: string; // 3번 슬롯 스킬 이름
  skill_name_4: string; // 4번 슬롯 스킬 이름
  preset_command_flag: string; // 플래그 값
}

// 훔친 스킬
export interface CharacterStealSkill {
  skill_name: string; // 스킬 이름
  skill_slot: string; // 스킬 슬롯
}

// 스텔라 메모라이즈
export interface CharacterStellaMemorize {
  skill_name: string; // 스킬 이름
  equipment_skill_set: string; // 적용된 세트
}

// 전체 스킬 데이터
export interface CharacterSkillData {
  character_class: string; // 직업명
  skill: {
    equipment_skill: CharacterEquipmentSkill[];
    preset: CharacterSkillPreset[];
    steal_skill: CharacterStealSkill[];
    stella_memorize: CharacterStellaMemorize[];
  };
}
