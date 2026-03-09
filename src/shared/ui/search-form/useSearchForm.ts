import { useState, useCallback, useSyncExternalStore } from "react";
import {
  ALL_WORLD_NAME,
  WORLD_NAMES,
} from "@/shared/config/constants/worlds";

const WORLD_OPTIONS_WITH_ALL: readonly string[] = WORLD_NAMES;
const WORLD_OPTIONS_WITHOUT_ALL: readonly string[] = WORLD_NAMES.filter(
  (w) => w !== ALL_WORLD_NAME,
);

const LAST_WORLD_UPDATED_EVENT = "search-last-world-updated";

const subscribeLastWorld = (onStoreChange: () => void) => {
  window.addEventListener(LAST_WORLD_UPDATED_EVENT, onStoreChange);
  return () => {
    window.removeEventListener(LAST_WORLD_UPDATED_EVENT, onStoreChange);
  };
};

interface UseSearchFormLogicProps {
  lastWorldKey: string;
  includeAllWorld: boolean;
  onSubmit: (world: string, name: string) => void;
  onValidate?: (world: string, name: string) => boolean;
}

export function useSearchForm({
  lastWorldKey,
  includeAllWorld,
  onSubmit,
  onValidate,
}: UseSearchFormLogicProps) {
  const defaultWorld = includeAllWorld ? ALL_WORLD_NAME : "스카니아";
  const worldOptions = includeAllWorld
    ? WORLD_OPTIONS_WITH_ALL
    : WORLD_OPTIONS_WITHOUT_ALL;

  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  // sessionStorage를 단일 출처로 두어 서버 렌더(기본 월드)와 하이드레이션 결과를 일치시킨다.
  const world = useSyncExternalStore(
    subscribeLastWorld,
    () => {
      const savedWorld = sessionStorage.getItem(lastWorldKey);
      return savedWorld && worldOptions.includes(savedWorld)
        ? savedWorld
        : defaultWorld;
    },
    () => defaultWorld,
  );

  const handleWorldChange = useCallback(
    (nextWorld: string) => {
      if (!worldOptions.includes(nextWorld)) return;
      sessionStorage.setItem(lastWorldKey, nextWorld);
      window.dispatchEvent(new Event(LAST_WORLD_UPDATED_EVENT));
    },
    [lastWorldKey, worldOptions],
  );

  const handleSearch = useCallback(
    (targetWorld: string, targetName: string) => {
      const trimmed = targetName.trim();

      if (onValidate) {
        if (!onValidate(targetWorld, trimmed)) {
          setIsError(true);
          return;
        }
      } else if (!trimmed) {
        setIsError(true);
        return;
      }

      setIsError(false);
      setInputValue("");
      // 최근 검색 선택 시 targetWorld가 현재 선택과 다를 수 있어 상태·스토리지를 함께 맞춘다.
      handleWorldChange(targetWorld);

      onSubmit(targetWorld, trimmed);
    },
    [handleWorldChange, onSubmit, onValidate],
  );

  const handleInputChange = (val: string, details?: { reason: string }) => {
    if (details?.reason === "input-change") {
      setInputValue(val);
      if (isError) setIsError(false);
    }
  };

  return {
    world,
    setWorld: handleWorldChange,
    inputValue,
    handleInputChange,
    isError,
    worldOptions,
    handleSearch,
  };
}
