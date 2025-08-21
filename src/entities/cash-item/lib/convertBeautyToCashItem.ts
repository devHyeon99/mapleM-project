import { CharacterBeautyData, CashItemEquipment } from "../model/types";

const ICONS = {
  HAIR: "/beauty/hair.png",
  FACE: "/beauty/face.png",
  SKIN: "/beauty/skin.png",
};

/**
 * 뷰티 데이터(헤어, 성형, 피부)를 캐시 장비 아이템 포맷으로 변환
 * lookMode: "0" (일반), "1" (엔버 드레스업)
 */
export const convertBeautyToCashItem = (
  beauty: CharacterBeautyData | undefined,
  lookMode: string = "0",
): CashItemEquipment[] => {
  if (!beauty) return [];

  // 엔젤릭버스터 드레스업 모드인지 확인 ("1"이면 additional 사용)
  const isDressUp = lookMode === "1";

  const hair = isDressUp
    ? beauty.additional_character_hair
    : beauty.character_hair;
  const face = isDressUp
    ? beauty.additional_character_face
    : beauty.character_face;
  const skinName = isDressUp
    ? beauty.additional_character_skin_name
    : beauty.character_skin_name;

  const result: CashItemEquipment[] = [];

  // 헤어
  if (hair) {
    result.push({
      cash_item_equipment_page_name: "헤어",
      cash_item_equipment_slot_name: "헤어",
      cash_item_name: hair.hair_name || "헤어 정보 없음",
      cash_item_icon: ICONS.HAIR,
      cash_item_description: "",
      cash_item_gender: beauty.character_gender === "Male" ? "남자" : "여자",
      cash_item_label: null,
      cash_item_coloring_prism: null,
      date_option_expire: null,
      cash_item_option: [
        { option_name: "베이스 컬러", option_value: hair.base_color || "없음" },
        { option_name: "믹스 컬러", option_value: hair.mix_color || "없음" },
        {
          option_name: "믹스 비율",
          option_value: hair.mix_rate ? `${hair.mix_rate}%` : "없음",
        },
      ],
    });
  }

  // 성형
  if (face) {
    result.push({
      cash_item_equipment_page_name: "성형",
      cash_item_equipment_slot_name: "성형",
      cash_item_name: face.face_name || "성형 정보 없음",
      cash_item_icon: ICONS.FACE,
      cash_item_description: "",
      cash_item_gender: beauty.character_gender === "Male" ? "남자" : "여자",
      cash_item_label: null,
      cash_item_coloring_prism: null,
      date_option_expire: null,
      cash_item_option: [
        { option_name: "베이스 컬러", option_value: face.base_color || "없음" },
        { option_name: "믹스 컬러", option_value: face.mix_color || "없음" },
        {
          option_name: "믹스 비율",
          option_value: face.mix_rate ? `${face.mix_rate}%` : "없음",
        },
      ],
    });
  }

  // 피부
  if (skinName) {
    result.push({
      cash_item_equipment_page_name: "피부",
      cash_item_equipment_slot_name: "피부",
      cash_item_name: skinName,
      cash_item_icon: ICONS.SKIN,
      cash_item_description: "",
      cash_item_gender: beauty.character_gender === "Male" ? "남자" : "여자",
      cash_item_label: null,
      cash_item_coloring_prism: null,
      date_option_expire: null,
      cash_item_option: [],
    });
  }

  return result;
};
