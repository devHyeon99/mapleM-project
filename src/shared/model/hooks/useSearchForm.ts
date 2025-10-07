import { useState, useCallback, useEffect } from "react";
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
  const [world, setWorld] = useState(includeAllWorld ? "전체" : "스카니아");
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const worldOptions = includeAllWorld
    ? WORLD_NAMES
    : WORLD_NAMES.filter((w) => w !== "전체");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(lastWorldKey);
      if (saved && (includeAllWorld || saved !== "전체")) {
        setWorld(saved);
      }
    }
  }, [lastWorldKey, includeAllWorld]);

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
      setOpen(false);
      setInputValue("");
      localStorage.setItem(lastWorldKey, targetWorld);

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
    setWorld,
    inputValue,
    handleInputChange,
    open,
    setOpen,
    isError,
    worldOptions,
    handleSearch,
  };
}
