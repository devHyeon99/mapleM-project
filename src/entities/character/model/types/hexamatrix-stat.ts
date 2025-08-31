/**
 * 개별 HEXA 스탯 코어 페이지 정보
 */
export interface HexaStatInfo {
  /** 페이지 번호 (1, 2, 3...) */
  page_no: number;

  /** 활성화 여부 ("1" = 활성, "0" = 비활성) */
  activate_flag: "0" | "1";

  /** 메인 스탯 이름 (예: '최대 대미지 100,000,000 증가') */
  main_stat: string;

  /** 메인 스탯 레벨 */
  main_stat_level: number;

  /** 보조 스탯 1 이름 */
  sub_1_stat: string;

  /** 보조 스탯 1 레벨 */
  sub_1_stat_level: number;

  /** 보조 스탯 2 이름 */
  sub_2_stat: string;

  /** 보조 스탯 2 레벨 */
  sub_2_stat_level: number;
}

/**
 * HEXA 매트릭스 스탯 코어 (슬롯 단위)
 */
export interface HexaMatrixStatCore {
  /** 스탯 코어 슬롯 번호 */
  stat_core_slot: number;

  /** 각 슬롯의 페이지별 스탯 정보 */
  stat_info: HexaStatInfo[];
}

/**
 * 캐릭터의 HEXA 매트릭스 스탯 전체 데이터
 */
export interface CharacterHexaMatrixStat {
  /** HEXA 매트릭스 스탯 코어 목록 */
  hexamatrix_stat: HexaMatrixStatCore[];
}
