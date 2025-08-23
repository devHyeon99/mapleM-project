// 장착된 개별 스킬
export interface CharacterEquipmentSkill {
  /** 현재 사용 중인 스킬 모드 */
  skill_mode: number;
  /** 해당 스킬을 장착한 스킬 세팅 */
  equipment_skill_set: string;
  /** 스킬 장착 슬롯 인덱스 */
  slot_id: string;
  /** 스킬 명 */
  skill_name: string;
  /** 스킬 아이콘 */
  skill_icon: string;
  /** 스킬 타입 */
  skill_type: string;
  /** 스킬 차수 */
  skill_grade: string;
  /** 추가 기능 활성화 여부 */
  add_feature_flag: string;
}

// 프리셋
export interface CharacterSkillPreset {
  /** 스킬 프리셋의 번호 */
  preset_slot_no: number;

  /** 1번 슬롯 스킬 명 */
  skill_name_1: string;
  /** 1번 슬롯 스킬 아이콘 */
  skill_icon_1: string;

  /** 2번 슬롯 스킬 명 */
  skill_name_2: string;
  /** 2번 슬롯 스킬 아이콘 */
  skill_icon_2: string;

  /** 3번 슬롯 스킬 명 */
  skill_name_3: string;
  /** 3번 슬롯 스킬 아이콘 */
  skill_icon_3: string;

  /** 4번 슬롯 스킬 명 */
  skill_name_4: string;
  /** 4번 슬롯 스킬 아이콘 */
  skill_icon_4: string;

  /** 스킬 프리셋의 커맨드 ON 활성화 여부 */
  preset_command_flag: string;
}

// 훔친 스킬 (팬텀)
export interface CharacterStealSkill {
  /** 스킬 명 */
  skill_name: string;
  /** 스킬 아이콘 */
  skill_icon: string;
  /** 스킬 슬롯 정보 */
  skill_slot: string;
}

// 스텔라 메모라이즈 (시아)
export interface CharacterStellaMemorize {
  /** 스킬 명 */
  skill_name: string;
  /** 스킬 아이콘 */
  skill_icon: string;
  /** 스킬을 장착한 스킬 세팅 */
  equipment_skill_set: string;
}

// 전체 스킬 데이터 응답
export interface CharacterSkillData {
  /** 캐릭터 직업 */
  character_class: string;
  /** 스킬 정보 객체 */
  skill: {
    /** 장착한 스킬 정보 리스트 */
    equipment_skill: CharacterEquipmentSkill[];
    /** 스킬 프리셋 리스트 */
    preset: CharacterSkillPreset[];
    /** 팬텀 훔친 스킬 리스트 */
    steal_skill: CharacterStealSkill[];
    /** 시아 스텔라 메모라이즈 리스트 */
    stella_memorize: CharacterStellaMemorize[];
  };
}
