"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export interface SearchHistoryItem {
  id: string;
  name: string;
  world: string;
  date: number;
}

const MAX_HISTORY_LIMIT = 6;
const SEARCH_HISTORY_UPDATED_EVENT = "search-history-updated";

const EMPTY_HISTORY: SearchHistoryItem[] = [];

const parseSearchHistory = (saved: string | null): SearchHistoryItem[] => {
  if (!saved) return EMPTY_HISTORY;

  try {
    return JSON.parse(saved) as SearchHistoryItem[];
  } catch {
    return EMPTY_HISTORY;
  }
};

const readSearchHistory = (storageKey: string): SearchHistoryItem[] =>
  parseSearchHistory(localStorage.getItem(storageKey));

const emitSearchHistoryUpdate = (storageKey: string) => {
  window.dispatchEvent(
    new CustomEvent(SEARCH_HISTORY_UPDATED_EVENT, {
      detail: { storageKey },
    }),
  );
};

const writeSearchHistory = (
  storageKey: string,
  history: SearchHistoryItem[],
) => {
  localStorage.setItem(storageKey, JSON.stringify(history));
  emitSearchHistoryUpdate(storageKey);
};

const updateSearchHistory = (
  storageKey: string,
  updater: (history: SearchHistoryItem[]) => SearchHistoryItem[],
) => {
  const currentHistory = readSearchHistory(storageKey);
  const next = updater(currentHistory);
  if (next === currentHistory) return;

  writeSearchHistory(storageKey, next);
};

export const useRecentSearch = (storageKey: string) => {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handleHistoryUpdate = (event: Event) => {
        const { detail } = event as CustomEvent<{ storageKey?: string }>;
        if (detail?.storageKey !== storageKey) return;

        onStoreChange();
      };

      window.addEventListener(
        SEARCH_HISTORY_UPDATED_EVENT,
        handleHistoryUpdate,
      );

      return () => {
        window.removeEventListener(
          SEARCH_HISTORY_UPDATED_EVENT,
          handleHistoryUpdate,
        );
      };
    },
    [storageKey],
  );

  // localStorage를 단일 출처로 두어 서버 렌더(빈 목록)와 하이드레이션 결과를 일치시킨다.
  // 스냅샷은 파싱 전 문자열이라 참조가 안정적이고, 파싱은 값이 바뀔 때만 수행한다.
  const rawHistory = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(storageKey),
    () => null,
  );
  const history = useMemo(() => parseSearchHistory(rawHistory), [rawHistory]);

  const addHistory = useCallback(
    (name: string, world: string) => {
      const trimmedName = name.trim();
      if (!trimmedName || world === "전체") return;

      updateSearchHistory(storageKey, (currentHistory) => {
        const filtered = currentHistory.filter(
          (item) => !(item.name === trimmedName && item.world === world),
        );
        const newItem = {
          id: Date.now().toString(),
          name: trimmedName,
          world,
          date: Date.now(),
        };

        return [newItem, ...filtered].slice(0, MAX_HISTORY_LIMIT);
      });
    },
    [storageKey],
  );

  const removeHistory = useCallback(
    (id: string) => {
      updateSearchHistory(storageKey, (currentHistory) =>
        currentHistory.some((item) => item.id === id)
          ? currentHistory.filter((item) => item.id !== id)
          : currentHistory,
      );
    },
    [storageKey],
  );

  const removeHistoryByParams = useCallback(
    (name: string, world: string) => {
      updateSearchHistory(storageKey, (currentHistory) => {
        const next = currentHistory.filter(
          (item) => !(item.name === name && item.world === world),
        );

        return next.length === currentHistory.length ? currentHistory : next;
      });
    },
    [storageKey],
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem(storageKey);
    emitSearchHistoryUpdate(storageKey);
  }, [storageKey]);

  return {
    history,
    addHistory,
    removeHistory,
    removeHistoryByParams,
    clearHistory,
  };
};
