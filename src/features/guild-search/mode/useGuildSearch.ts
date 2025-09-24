"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { useGuildSearchHistory } from "./useGuildSearchHistory";

type WorldName = (typeof WORLD_NAMES)[number];

export const useGuildSearch = () => {
  const router = useRouter();
  const { addHistoryItem } = useGuildSearchHistory();
  const validWorlds = WORLD_NAMES.filter(
    (name) => name !== "전체",
  ) as WorldName[];

  const [guildName, setGuildName] = useState("");
  const [world, setWorld] = useState<WorldName>(validWorlds[0]);
  const [isPending, setIsPending] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const executeSearch = useCallback(
    (name: string, selectedWorld: WorldName) => {
      const trimmed = name.trim();

      // 빈 값 검증
      if (!trimmed) {
        setError("길드명을 입력해 주세요.");
        return;
      }

      // 글자 수 검증 (메이플M 길드명 최소 2자)
      if (trimmed.length < 2) {
        setError("길드명은 최소 2자 이상이어야 합니다.");
        return;
      }

      // 특수문자 및 공백 검증 (한글, 영문, 숫자만 허용)
      const guildNameRegex = /^[가-힣a-zA-Z0-9]+$/;
      if (!guildNameRegex.test(trimmed)) {
        setError("길드명에는 특수문자나 공백을 사용할 수 없습니다.");
        return;
      }

      setError(null);
      setIsPending(true);
      addHistoryItem(trimmed, selectedWorld);
      setShowHistory(false);

      router.push(
        `/guild/${encodeURIComponent(selectedWorld)}/${encodeURIComponent(trimmed)}`,
      );
      setTimeout(() => setIsPending(false), 500);
    },
    [addHistoryItem, router],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(guildName, world);
  };

  const handleWorldChange = (value: string) => {
    setWorld(value as WorldName);
    setError(null);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuildName(e.target.value);
    if (error) setError(null); // 입력 시작 시 에러 제거
  };

  const handleInputFocus = () => {
    setShowHistory(true);
    setError(null);
  };

  const handleHistorySearch = (name: string, selectedWorld: WorldName) => {
    setGuildName(name);
    setWorld(selectedWorld);
    executeSearch(name, selectedWorld);
  };

  return {
    guildName,
    world,
    isPending,
    showHistory,
    error,
    searchContainerRef,
    validWorlds,
    handleSubmit,
    handleWorldChange,
    handleHistorySearch,
    handleInputFocus,
    handleQueryChange,
  };
};
