"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WORLD_NAMES } from "@/constants/worlds";
import { usePersistentWorld } from "@/hooks/usePersistentWorld";
import { CharacterSearchHistory } from "./CharacterSearchHistory";
import { saveSearchHistory } from "@/utils/localStorage";

type WorldName = (typeof WORLD_NAMES)[number];

export const CharacterSearch = () => {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [world, setWorld] = usePersistentWorld();
  const [isPending, startTransition] = useTransition(); // ⬅️ useTransition 도입

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 외부 영역 클릭 감지 로직
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  /**
   * 공통 라우팅 및 히스토리 저장 함수
   */
  const navigateToCharacter = (name: string, world: WorldName) => {
    const trimmedName = name.trim();
    if (!trimmedName) return; // 빈 값 검색 방지

    // 검색 즉시 히스토리 저장
    saveSearchHistory(trimmedName, world);
    setShowHistory(false);

    let path: string;

    // 라우팅 경로 분기
    if (world === "전체") {
      // "전체" 월드 검색 (CSR 페이지로 라우팅)
      path = `/characters/${encodeURIComponent(trimmedName)}`;
    } else {
      // "단일" 월드 검색 (SEO를 위한 SSR 페이지로 라우팅)
      path = `/character/${encodeURIComponent(world)}/${encodeURIComponent(
        trimmedName,
      )}`;
    }

    // startTransition으로 라우팅을 감싸서 부드러운 UI 전환
    startTransition(() => {
      router.push(path);
    });
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigateToCharacter(query, world);
  };

  /**
   * 월드 변경 핸들러
   */
  const handleWorldChange = (value: string) => {
    setWorld(value as WorldName);
  };

  /**
   * 검색 기록 클릭 핸들러
   */
  const handleHistorySearch = (name: string, world: WorldName) => {
    setQuery(name);
    setWorld(world);
    navigateToCharacter(name, world);
  };

  return (
    <div className="relative w-full max-w-3xl" ref={searchContainerRef}>
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="캐릭터 검색"
        className="relative flex w-full items-center gap-2"
      >
        {/* 월드 선택 */}
        <Select value={world} onValueChange={handleWorldChange}>
          <SelectTrigger
            aria-label="월드 선택"
            className="!bg-secondary !h-12 min-w-25 rounded-xs lg:w-31.5"
          >
            <SelectValue placeholder="월드" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="font-bold">월드 목록</SelectLabel>
              {WORLD_NAMES.map((w) => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* 캐릭터 이름 입력 */}
        <Input
          placeholder="캐릭터 이름을 입력하세요"
          className="!bg-secondary !h-12 w-full rounded-xs pr-20 placeholder:text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowHistory(true)}
          disabled={isPending}
        />

        {/* 검색 버튼 */}
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={isPending || !query.trim()}
          className="absolute right-0 mr-0.5 h-[45px] cursor-pointer rounded-xs"
        >
          {isPending ? "이동 중..." : "캐릭터 검색"}
        </Button>
      </form>

      {showHistory && (
        <div className="bg-card absolute right-0 z-10 mt-1 min-h-85 w-full overflow-y-auto rounded-xs border p-4 shadow-lg lg:w-[calc(100%-116px)]">
          <CharacterSearchHistory onHistorySearch={handleHistorySearch} />
        </div>
      )}
    </div>
  );
};
