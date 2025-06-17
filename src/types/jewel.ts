// 보석 단일 슬롯 정보
export interface JewelInfo {
  slot_no: number; // 슬롯 번호
  jewel_name: string; // 보석 이름
  jewel_grade: string; // 보석 등급
  jewel_color: string; // 보석 색상
  jewel_option: string; // 보석 옵션 설명
  jewel_icon: string; // 보석 아이콘 URL
}

// 보석 페이지 (한 페이지에 여러 슬롯)
export interface JewelPage {
  jewel_page_no: number; // 페이지 번호
  jewel_info: JewelInfo[]; // 슬롯에 장착된 보석 목록
}

// 캐릭터 보석 장비 정보
export interface CharacterJewelEquipment {
  use_jewel_page_no: number; // 현재 사용 중인 페이지 번호
  use_jewel_set_option: string; // 세트 옵션 설명
  jewel_equipment: JewelPage[]; // 장착된 보석 페이지들
}
