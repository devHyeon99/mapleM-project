// 컬러링 프리즘 계열 타입
export type ColorRange =
  | "1" // 전체계열
  | "2" // 빨간색
  | "3" // 노란색
  | "4" // 초록색
  | "5" // 청록색
  | "6" // 파란색
  | "7" // 보라색
  | null; // 값이 없을 수도 있음

// 캐시 아이템 옵션 (예: 추가 옵션, 잠재 능력)
export interface CashItemOption {
  option_no: number;
  option_name: string | null;
  option_value: string | null;
}

// 캐시 아이템 프리즘 정보
export interface CashItemColoringPrism {
  color_range: ColorRange; // 적용 범위 (문자열로 옴, "1" 등)
  hue: number | null; // 색조 (null 가능)
  saturation: number | null; // 채도
  value: number | null; // 명도
}

// 캐시 장비 슬롯 데이터
export interface CashItemEquipment {
  character_look_mode?: string; // 캐릭터 외형 모드 (0: 일반모드, 1: 엔젤릭버스터인 경우 드레스 업 모드)
  cash_item_equipment_page_name: string; // UI 카테고리 (예: "모자", "한벌옷")
  cash_item_equipment_slot_name: string; // 구체적 슬롯명 (예: "목걸이 (2번째 슬롯)")
  cash_item_name: string; // 아이템 이름
  cash_item_icon: string; // 캐시 아이템 아이콘 (컬러링 프리즘 효과 미반영 상태)
  cash_item_description: string; // 설명 (없으면 "")
  cash_item_gender: string; // "공용" | "남자" | "여자"
  cash_item_option: CashItemOption[]; // 옵션 리스트
  date_option_expire: string | null; // 만료일 (null → 무제한)
  cash_item_label: string | null; // 라벨 (ex: 이벤트, 신규 등)
  cash_item_coloring_prism: CashItemColoringPrism | null; // 컬러링 프리즘 정보
}

// 캐시 장비 응답
export interface CharacterCashEquipment {
  cash_item_equipment: CashItemEquipment[]; // 착용 중인 캐시 아이템
  additional_cash_item_equipment: CashItemEquipment[]; // 추가 캐시 아이템
}
