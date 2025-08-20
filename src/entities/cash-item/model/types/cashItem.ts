// ============================================================================
// 캐시 장비 (Cash Equipment)
// ============================================================================

// 컬러링 프리즘 색상 범위 타입
export type ColorRange =
  | "1" // 전체계열
  | "2" // 빨간색
  | "3" // 노란색
  | "4" // 초록색
  | "5" // 청록색
  | "6" // 파란색
  | "7" // 보라색
  | string // 혹시 모를 예외 케이스 대비
  | null;

// 캐시 아이템 옵션
export interface CashItemOption {
  option_name: string;
  option_value: string;
}

// 캐시 아이템 컬러링 프리즘 정보
export interface CashItemColoringPrism {
  color_range: ColorRange; // 색상 범위
  hue: number | null; // 색조
  saturation: number | null; // 채도
  value: number | null; // 명도
}

// 개별 캐시 아이템 정보
export interface CashItemEquipment {
  cash_item_equipment_page_name: string; // 장착 부위 (UI 카테고리)
  cash_item_equipment_slot_name: string; // 슬롯 이름
  cash_item_name: string; // 아이템 이름
  cash_item_icon: string; // 아이콘 URL
  cash_item_description: string; // 설명
  cash_item_gender: string; // 성별
  cash_item_option: CashItemOption[]; // 옵션 목록
  date_option_expire: string | null; // 만료일 (UTC string or null)
  cash_item_label: string | null; // 라벨 (마스터, 스페셜 등)
  cash_item_coloring_prism: CashItemColoringPrism | null; // 프리즘 정보
}

// 일반 코디 프리셋 정보
export interface CashEquipmentPreset {
  preset_no: number;
  cash_item_equipment: CashItemEquipment[];
}

// 엔젤릭버스터 드레스업 모드 프리셋 정보
export interface AdditionalCashEquipmentPreset {
  preset_no: number;
  additional_cash_item_equipment: CashItemEquipment[];
}

// ============================================================================
// 뷰티 (Beauty - Hair, Face, Skin)
// ============================================================================

// 헤어 정보
export interface CharacterHair {
  hair_name: string | null;
  base_color: string | null;
  mix_color: string | null;
  mix_rate: string | null;
}

// 성형 정보
export interface CharacterFace {
  face_name: string | null;
  base_color: string | null;
  mix_color: string | null;
  mix_rate: string | null;
}

// 뷰티 API 응답 전체 구조
export interface CharacterBeautyData {
  character_class: string;
  character_gender: string;

  // 일반 모드
  character_hair: CharacterHair | null;
  character_face: CharacterFace | null;
  character_skin_name: string | null;

  // 엔젤릭버스터 드레스업 모드 (미사용 시 null)
  additional_character_hair: CharacterHair | null;
  additional_character_face: CharacterFace | null;
  additional_character_skin_name: string | null;
}

// ============================================================================
// 통합 데이터 (API Response)
// ============================================================================

// API 응답 전체 구조 (캐시 장비 + 뷰티 데이터)
export interface CharacterCashEquipmentData {
  character_class: string;
  character_gender: string;
  use_preset_no: number; // 현재 적용 중인 프리셋 번호
  use_additional_preset_no: number; // 현재 적용 중인 드레스업 프리셋 번호
  character_look_mode: string; // "0": 일반, "1": 드레스업

  // 현재 장착 중인 장비
  cash_item_equipment: CashItemEquipment[];
  additional_cash_item_equipment: CashItemEquipment[];

  // 프리셋 리스트
  cash_equipment_preset: CashEquipmentPreset[];
  additional_cash_equipment_preset: AdditionalCashEquipmentPreset[];

  // 뷰티
  beauty_data: CharacterBeautyData;
}
