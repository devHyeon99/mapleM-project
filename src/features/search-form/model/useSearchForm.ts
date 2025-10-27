import { useState, useCallback } from "react";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";

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
  const defaultWorld = includeAllWorld ? "전체" : "스카니아";
  const worldOptions = includeAllWorld
    ? WORLD_NAMES
    : WORLD_NAMES.filter((w) => w !== "전체");

  const [world, setWorld] = useState(() => {
    if (typeof window === "undefined") return defaultWorld;
    const savedWorld = sessionStorage.getItem(lastWorldKey);
    if (
      savedWorld &&
      (worldOptions as readonly string[]).includes(savedWorld)
    ) {
      return savedWorld;
    }
    return defaultWorld;
  });
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  const handleWorldChange = useCallback(
    (nextWorld: string) => {
      if (!(worldOptions as readonly string[]).includes(nextWorld)) return;
      const safeWorld = nextWorld as (typeof worldOptions)[number];
      setWorld(safeWorld);
      sessionStorage.setItem(lastWorldKey, safeWorld);
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
      sessionStorage.setItem(lastWorldKey, targetWorld);

      onSubmit(targetWorld, trimmed);
    },
    [lastWorldKey, onSubmit, onValidate],
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
