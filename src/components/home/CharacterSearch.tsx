"use client";

import { useState, useRef, useEffect } from "react"; // useRef, useEffect 추가
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
import { useCharacterSearch } from "@/hooks/useCharacterSearch";
import { usePersistentWorld } from "@/hooks/usePersistentWorld";
import { CharacterSearchHistory } from "./CharacterSearchHistory";

interface CharacterSearchProps {
  onSearch?: (ocid: string) => void;
}

type WorldName = (typeof WORLD_NAMES)[number];

export const CharacterSearch = ({ onSearch }: CharacterSearchProps) => {
  const [query, setQuery] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [world, setWorld] = usePersistentWorld();

  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { loading, searchCharacter } = useCharacterSearch(onSearch);

  useEffect(() => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchCharacter(query, world);
    setShowHistory(false);
  };

  const handleWorldChange = (value: string) => {
    setWorld(value as WorldName);
  };

  const handleHistorySearch = (name: string, world: WorldName) => {
    setQuery(name);
    setWorld(world);
    searchCharacter(name, world);
    setShowHistory(false);
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
        />

        {/* 검색 버튼 */}
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={loading}
          className="absolute right-0 mr-0.5 h-[45px] cursor-pointer rounded-xs"
        >
          {loading ? "검색 중..." : "캐릭터 검색"}
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
