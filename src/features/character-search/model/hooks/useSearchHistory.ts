"use client";

import { useState, useEffect, useCallback } from "react";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";

const SEARCH_HISTORY_KEY = "characterSearchHistory";
type WorldName = (typeof WORLD_NAMES)[number];

interface SearchHistoryItem {
  name: string;
  world: WorldName;
  timestamp: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  const loadHistory = useCallback(() => {
    try {
      const existingHistoryString = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (existingHistoryString) {
        const parsedHistory: SearchHistoryItem[] = JSON.parse(
          existingHistoryString,
        );
        // "전체" 제외 및 정렬
        const filteredHistory = parsedHistory
          .filter((item) => item.world !== "전체")
          .sort((a, b) => b.timestamp - a.timestamp);
        setHistory(filteredHistory);
      } else {
        setHistory([]);
      }
    } catch (e) {
      console.error("Local Storage 불러오기 실패:", e);
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    loadHistory();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SEARCH_HISTORY_KEY) loadHistory();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadHistory]);

  const addHistoryItem = (name: string, world: WorldName) => {
    if (world === "전체") return; // "전체" 월드는 저장하지 않음

    const newHistoryItem: SearchHistoryItem = {
      name,
      world,
      timestamp: Date.now(),
    };

    setHistory((prevHistory) => {
      // 중복 제거 (동일 이름 & 동일 월드)
      const filtered = prevHistory.filter(
        (item) => !(item.name === name && item.world === world),
      );
      const newHistory = [newHistoryItem, ...filtered].slice(0, 6);

      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeHistoryItem = (name: string, world: WorldName) => {
    setHistory((prevHistory) => {
      const newHistory = prevHistory.filter(
        (item) => !(item.name === name && item.world === world),
      );
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearAllHistory = () => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setHistory([]);
  };

  return {
    history,
    addHistoryItem,
    removeHistoryItem,
    clearAllHistory,
  };
}
