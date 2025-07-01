"use client";

import { useState } from "react";
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

interface CharacterSearchProps {
  onSearch?: (ocid: string) => void;
}

export const CharacterSearch = ({ onSearch }: CharacterSearchProps) => {
  const [query, setQuery] = useState("");
  const [world, setWorld] = useState<(typeof WORLD_NAMES)[number]>("스카니아");

  const { loading, searchCharacter } = useCharacterSearch(onSearch);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchCharacter(query, world);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="캐릭터 검색"
      className="relative flex w-full max-w-3xl items-center gap-2"
    >
      {/* 월드 선택 */}
      <Select
        value={world}
        onValueChange={(value) =>
          setWorld(value as (typeof WORLD_NAMES)[number])
        }
      >
        <SelectTrigger
          aria-label="월드 선택"
          className="!bg-secondary !h-12 w-25 rounded-xs lg:w-31.5"
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
      />

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
  );
};
