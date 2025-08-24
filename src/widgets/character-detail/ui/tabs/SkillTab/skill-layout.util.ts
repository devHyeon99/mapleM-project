const POSITIONS = {
  A: {
    front: [
      { right: 120, bottom: 120 }, // 슬롯 2 위치
      { right: 55, bottom: 115 }, // 슬롯 3 위치
      { right: 180, bottom: 90 }, // 슬롯 1 위치
      { right: 180, bottom: 20 }, // 슬롯 0 위치
      { right: 115, bottom: 45 }, // 슬롯 9 위치
    ],
    back: [
      { right: 120, bottom: 120 },
      { right: 55, bottom: 115 },
      { right: 180, bottom: 90 },
      { right: 180, bottom: 20 },
      { right: 115, bottom: 45 },
    ],
  },
  B: {
    front: [
      { right: 185, bottom: 140 }, // 34
      { right: 125, bottom: 140 }, // 35
      { right: 65, bottom: 140 }, // 36
      { right: 215, bottom: 80 }, // 31
      { right: 155, bottom: 80 }, // 32
      { right: 95, bottom: 80 }, // 33
      { right: 185, bottom: 20 }, // 30
      { right: 125, bottom: 20 }, // 45
    ],
    back: [
      { right: 185, bottom: 140 }, // 41
      { right: 125, bottom: 140 }, // 42
      { right: 65, bottom: 140 }, // 43
      { right: 215, bottom: 80 }, // 38
      { right: 155, bottom: 80 }, // 39
      { right: 95, bottom: 80 }, // 40
      { right: 185, bottom: 20 }, // 37
      { right: 125, bottom: 20 }, // 44
    ],
  },
};

// 각 세트별 들어갈 ID 순서 정의
// 위 POSITIONS 배열의 인덱스 순서와 일치해야함.
const SLOT_IDS = {
  A: {
    1: { front: ["2", "3", "1", "0", "9"], back: ["6", "7", "5", "4", "8"] },
    2: {
      front: ["12", "13", "11", "10", "19"],
      back: ["16", "17", "15", "14", "18"],
    },
    3: {
      front: ["22", "23", "21", "20", "29"],
      back: ["26", "27", "25", "24", "28"],
    },
  },
  B: {
    1: {
      front: ["34", "35", "36", "31", "32", "33", "30", "45"],
      back: ["41", "42", "43", "38", "39", "40", "37", "44"],
    },
    2: {
      front: ["50", "51", "52", "47", "48", "49", "46", "61"],
      back: ["57", "58", "59", "54", "55", "56", "53", "60"],
    },
    3: {
      front: ["66", "67", "68", "63", "64", "65", "62", "77"],
      back: ["73", "74", "75", "70", "71", "72", "69", "76"],
    },
  },
};

// 최종적으로 사용할 타입
export type SlotConfig = { id: string; bottom: number; right: number };

// 데이터 병합 함수 (런타임 혹은 빌드타임에 사용)
export const getPageLayout = (
  mode: 1 | 2,
  setNo: number,
  page: "front" | "back",
): SlotConfig[] => {
  const modeKey = mode === 1 ? "A" : "B";
  const positions = POSITIONS[modeKey][page];
  const ids = SLOT_IDS[modeKey][setNo as 1 | 2 | 3]?.[page];

  if (!positions || !ids) return [];

  return positions
    .map((pos, idx) => ({
      ...pos,
      id: ids[idx] || "", // ID가 없으면 빈 문자열
    }))
    .filter((item) => item.id !== ""); // ID 없는 것은 제외
};
