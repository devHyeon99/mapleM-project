"use client";

import { useState, useEffect } from "react";
import { WORLD_NAMES } from "@/constants/worlds";

const SEARCH_HISTORY_KEY = "characterSearchHistory";

// 검색 기록 항목 타입 정의
interface SearchHistoryItem {
  name: string;
  world: (typeof WORLD_NAMES)[number];
  timestamp: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Local Storage에서 기록을 불러오는 함수
  const loadHistory = () => {
    try {
      const existingHistoryString = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (existingHistoryString) {
        const parsedHistory: SearchHistoryItem[] = JSON.parse(
          existingHistoryString,
        );
        // timestamp를 기준으로 내림차순 정렬 (최신순)
        parsedHistory.sort((a, b) => b.timestamp - a.timestamp);
        setHistory(parsedHistory);
      } else {
        setHistory([]);
      }
    } catch (e) {
      console.error("Local Storage 불러오기 실패:", e);
      setHistory([]);
    }
  };

  // 컴포넌트 마운트 시점에 기록을 불러옴
  useEffect(() => {
    loadHistory();

    // 다른 탭/창에서 기록이 변경될 경우 동기화
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SEARCH_HISTORY_KEY) {
        loadHistory();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // 기록을 삭제하고 Local Storage에 반영하는 함수
  const removeHistoryItem = (
    name: string,
    world: (typeof WORLD_NAMES)[number],
  ) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter(
        (item) => !(item.name === name && item.world === world),
      );
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      } catch (e) {
        console.error("Local Storage 삭제 후 저장 실패:", e);
      }
      return newHistory;
    });
  };

  // 모든 기록을 삭제하는 함수
  const clearAllHistory = () => {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      setHistory([]);
    } catch (e) {
      console.error("Local Storage 전체 삭제 실패:", e);
    }
  };

  return {
    history,
    loadHistory,
    removeHistoryItem,
    clearAllHistory,
  };
}
