"use client";

import { useState, useEffect, useCallback } from "react";

export interface SearchHistoryItem {
  id: string;
  name: string;
  world: string;
  date: number;
}

const MAX_HISTORY_LIMIT = 6;

export const useRecentSearch = (storageKey: string) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  const addHistory = useCallback(
    (name: string, world: string) => {
      const trimmedName = name.trim();
      if (!trimmedName || world === "전체") return;

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) => !(item.name === trimmedName && item.world === world),
        );
        const newItem = {
          id: Date.now().toString(),
          name: trimmedName,
          world,
          date: Date.now(),
        };
        const next = [newItem, ...filtered].slice(0, MAX_HISTORY_LIMIT);
        localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey],
  );

  const removeHistory = useCallback(
    (id: string) => {
      setHistory((prev) => {
        const next = prev.filter((item) => item.id !== id);
        localStorage.setItem(storageKey, JSON.stringify(next));
        return next;
      });
    },
    [storageKey],
  );

  const removeHistoryByParams = useCallback(
    (name: string, world: string) => {
      const saved = localStorage.getItem(storageKey);
      const currentHistory: SearchHistoryItem[] = saved
        ? JSON.parse(saved)
        : [];

      const next = currentHistory.filter(
        (item) => !(item.name === name && item.world === world),
      );

      if (currentHistory.length !== next.length) {
        localStorage.setItem(storageKey, JSON.stringify(next));
        setHistory(next);
      }
    },
    [storageKey],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    history: isMounted ? history : [],
    addHistory,
    removeHistory,
    removeHistoryByParams,
    clearHistory,
  };
};
