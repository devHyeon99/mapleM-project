/**
 * 개별 V코어 슬롯 정보
 */
export interface VCoreEquipment {
  /** 슬롯 고유 ID (1~26) */
  slot_id: string;

  /** 슬롯 강화 단계 (0~5) */
  slot_level: number;

  /** V코어 이름 (예: '쉐도우 스피어', '도미니언') */
  vcore_name: string;

  /** V코어 레벨 (1~25) */
  vcore_level: number;

  /** 연결된 첫 번째 스킬 이름 */
  vcore_skill_name1: string;

  /** 연결된 두 번째 스킬 이름 */
  vcore_skill_name2: string;

  /** 연결된 세 번째 스킬 이름 */
  vcore_skill_name3: string;

  /** V코어 타입 */
  vcore_type: "Skill" | "Enhancement";
}

/**
 * 캐릭터의 V매트릭스 전체 데이터
 */
export interface CharacterVMatrix {
  /** 슬롯별 V코어 장비 정보 목록 */
  character_v_core_equipment: VCoreEquipment[];
}
