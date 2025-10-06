"use client";

import { useState, useEffect } from "react";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { STORAGE_KEYS } from "@/shared/config/constants/storage";

type WorldName = (typeof WORLD_NAMES)[number];

interface GuildHistoryItem {
  name: string;
  world: WorldName;
  timestamp: number;
}

const MAX_HISTORY = 6;

export const useGuildSearchHistory = () => {
  const [history, setHistory] = useState<GuildHistoryItem[]>([]);

  // 초기 로드
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GUILD_SEARCH_HISTORY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse guild history:", error);
      }
    }
  }, []);

  // 히스토리 추가
  const addHistoryItem = (name: string, world: WorldName) => {
    const newItem: GuildHistoryItem = {
      name,
      world,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // 중복 제거 (이름과 월드가 모두 같은 경우)
      const filtered = prev.filter(
        (item) => !(item.name === name && item.world === world),
      );

      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(
        STORAGE_KEYS.GUILD_SEARCH_HISTORY,
        JSON.stringify(updated),
      );
      return updated;
    });
  };

  // 개별 삭제
  const removeHistoryItem = (name: string, world: WorldName) => {
    setHistory((prev) => {
      const updated = prev.filter(
        (item) => !(item.name === name && item.world === world),
      );
      localStorage.setItem(
        STORAGE_KEYS.GUILD_SEARCH_HISTORY,
        JSON.stringify(updated),
      );
      return updated;
    });
  };

  // 전체 삭제
  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEYS.GUILD_SEARCH_HISTORY);
  };

  return {
    history,
    addHistoryItem,
    removeHistoryItem,
    clearAllHistory,
  };
};
