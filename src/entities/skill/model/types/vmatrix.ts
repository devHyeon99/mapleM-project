/**
 * 개별 V코어 정보
 */
export interface VCoreEquipment {
  /** V코어 타입 (Skill | Enhancement | JobList | Common | Special) */
  vcore_type: string;

  /** V코어 레벨 (1~25) */
  vcore_level: number;

  /** 연결된 첫 번째 스킬 이름 */
  vcore_skill_name1: string;

  /** 연결된 두 번째 스킬 이름 */
  vcore_skill_name2: string | null;

  /** 연결된 세 번째 스킬 이름 */
  vcore_skill_name3: string | null;

  /** 연결된 네 번째 스킬 이름 */
  vcore_skill_name4: string | null;

  /** 기간제 여부 (0:영구, 1:기간제) */
  vcore_expire_flag: string;

  /** 만료 시간 (UTC0) */
  vcore_expire_date: string | null;

  /** 장착 여부 (0:미장착, 1:장착) */
  vcore_equipment_flag: string;
}

/**
 * 캐릭터의 V매트릭스 전체 데이터
 */
export interface CharacterVMatrix {
  /** 캐릭터 직업 */
  character_class: string;

  /** V코어 목록 */
  character_v_core_equipment: VCoreEquipment[];
}
