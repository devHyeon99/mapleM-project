"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { usePersistentWorld } from "@/shared/lib/hooks/usePersistentWorld";
import { useSearchHistory } from "./useSearchHistory";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { toast } from "sonner";

type WorldName = (typeof WORLD_NAMES)[number];

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
const VALIDATION_ERROR_MESSAGE =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";

export const useCharacterSearch = () => {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [world, setWorld] = usePersistentWorld();
  const [isPending, startTransition] = useTransition();
  const { addHistoryItem } = useSearchHistory();

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }
    function handleFocusOutside(event: FocusEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleFocusOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, []);

  const navigateToCharacter = (name: string, targetWorld: WorldName) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    // 히스토리 저장 로직 (훅 사용)
    addHistoryItem(trimmedName, targetWorld);

    setShowHistory(false);

    const path =
      targetWorld === "전체"
        ? `/characters/${encodeURIComponent(trimmedName)}`
        : `/character/${encodeURIComponent(targetWorld)}/${encodeURIComponent(trimmedName)}`;

    startTransition(() => {
      router.push(path);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!VALIDATION_REGEX.test(trimmedQuery)) {
      toast.error("입력 오류", { description: VALIDATION_ERROR_MESSAGE });
      return;
    }

    navigateToCharacter(trimmedQuery, world);
  };

  const handleWorldChange = (value: string) => {
    setWorld(value as WorldName);
  };

  const handleHistorySearch = (name: string, targetWorld: WorldName) => {
    setQuery(name);
    setWorld(targetWorld);
    navigateToCharacter(name, targetWorld);
  };

  const handleInputFocus = () => setShowHistory(true);
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return {
    query,
    world,
    isPending,
    showHistory,
    searchContainerRef,
    handleSubmit,
    handleWorldChange,
    handleHistorySearch,
    handleInputFocus,
    handleQueryChange,
  };
};
