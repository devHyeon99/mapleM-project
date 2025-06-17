// 캐시 아이템 옵션 (예: 추가 옵션, 잠재 능력)
export interface CashItemOption {
  option_no: number;
  option_name: string | null;
  option_value: string | null;
}

// 캐시 아이템 프리즘 정보
export interface CashItemColoringPrism {
  color_range: string | null; // 적용 범위 (문자열로 옴, "1" 등)
  hue: number | null; // 색조 (null 가능)
  saturation: number | null; // 채도
  value: number | null; // 명도
}

// 캐시 장비 슬롯 데이터
export interface CashItemEquipment {
  cash_item_equipment_page_name: string; // UI 카테고리 (예: "모자", "한벌옷")
  cash_item_equipment_slot_name: string; // 구체적 슬롯명 (예: "목걸이 (2번째 슬롯)")
  cash_item_name: string; // 아이템 이름
  cash_item_icon: string; // 아이콘 URL
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
