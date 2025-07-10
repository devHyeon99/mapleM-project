import { WORLD_NAMES } from "@/constants/worlds";

const SEARCH_HISTORY_KEY = "characterSearchHistory";

export interface SearchHistoryItem {
  name: string;
  world: (typeof WORLD_NAMES)[number];
  timestamp: number;
}

/**
 * 로컬 스토리지에 캐릭터 검색 기록을 저장
 * @param name 캐릭터 닉네임
 * @param world 검색된 월드 이름
 */
export const saveSearchHistory = (
  name: string,
  world: (typeof WORLD_NAMES)[number],
) => {
  try {
    const existingHistoryString = localStorage.getItem(SEARCH_HISTORY_KEY);
    // 기존 기록이 있으면 JSON 파싱, 없으면 빈 배열
    const existingHistory: SearchHistoryItem[] = existingHistoryString
      ? JSON.parse(existingHistoryString)
      : [];

    const newEntry: SearchHistoryItem = {
      name,
      world,
      timestamp: Date.now(), // 비결정적 요소
    };

    // 중복 제거 및 최신 기록을 맨 앞으로
    const filteredHistory = existingHistory.filter(
      (item) => !(item.name === name && item.world === world),
    );

    // 새 기록을 배열의 맨 앞에 추가
    // 최대 6개만 유지 (최신 기록 1개 + 이전 기록 5개)
    const updatedHistory = [newEntry, ...filteredHistory].slice(0, 6);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    // Local Storage가 비활성화된 환경(예: 일부 Safari 프라이빗 모드)에서도 앱이 멈추지 않도록 처리
    console.error("Local Storage 저장 실패:", e);
  }
};
