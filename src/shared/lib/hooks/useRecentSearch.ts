"use client";

import { useState, useCallback } from "react";

export interface SearchHistoryItem {
  id: string;
  name: string;
  world: string;
  date: number;
}

const MAX_HISTORY_LIMIT = 6;

const readSearchHistory = (storageKey: string): SearchHistoryItem[] => {
  const saved = localStorage.getItem(storageKey);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved) as SearchHistoryItem[];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
};

export const useRecentSearch = (storageKey: string) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    return readSearchHistory(storageKey);
  });

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
      const currentHistory = readSearchHistory(storageKey);

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
    history,
    addHistory,
    removeHistory,
    removeHistoryByParams,
    clearHistory,
  };
};
