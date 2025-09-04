import { CharacterItemEquipment } from "@/entities/item";

// --- 카드 슬롯 순서 상수 ---
const CARD_EQUIP_SLOT_ORDER_ONEPIECE = [
  "무기",
  "보조무기",
  "모자",
  "장갑",
  "목걸이",
  "목걸이 (2번째 슬롯)",
  "한벌옷",
  "",
  "반지",
  "반지 (2번째 슬롯)",
  "어깨",
  "신발",
  "반지 (3번째 슬롯)",
  "반지 (4번째 슬롯)",
  "벨트",
  "망토",
  "귀고리",
  "포켓",
  "얼굴장식",
  "눈장식",
  "칭호",
  "훈장",
  "뱃지",
  "엠블렘",
];

const CARD_EQUIP_SLOT_ORDER_TOPBOTTOM = [
  "무기",
  "보조무기",
  "모자",
  "장갑",
  "목걸이",
  "목걸이 (2번째 슬롯)",
  "상의",
  "하의",
  "반지",
  "반지 (2번째 슬롯)",
  "어깨",
  "신발",
  "반지 (3번째 슬롯)",
  "반지 (4번째 슬롯)",
  "벨트",
  "망토",
  "귀고리",
  "포켓",
  "얼굴장식",
  "눈장식",
  "칭호",
  "훈장",
  "뱃지",
  "엠블렘",
];

export interface EmptySlotPlaceholder {
  isPlaceholder: true;
  label: string;
}

export type SpecCardItem = CharacterItemEquipment | EmptySlotPlaceholder;

export const getSortedSpecCardItems = (
  items: CharacterItemEquipment[],
): SpecCardItem[] => {
  // 1. 한벌옷 착용 여부 확인
  const hasOnePiece = items.some(
    (item) => item.item_equipment_slot_name === "한벌옷",
  );

  // 2. 기준 순서 배열 선택
  const targetOrder = hasOnePiece
    ? CARD_EQUIP_SLOT_ORDER_ONEPIECE
    : CARD_EQUIP_SLOT_ORDER_TOPBOTTOM;

  // 4. 매핑 시작
  return targetOrder.map((slotName) => {
    // 빈 슬롯("")인 경우 (한벌옷 옆자리)
    if (slotName === "") return { isPlaceholder: true, label: "" };

    const foundItem = items.find(
      (item) => item.item_equipment_slot_name === slotName,
    );

    if (foundItem) return foundItem;

    const displayLabel = slotName;

    // 일반 케이스: 슬롯 이름으로 찾기
    return { isPlaceholder: true, label: displayLabel };
  });
};
