"use client";

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
import { Search, Loader2 } from "lucide-react";
import { CharacterSearchHistory } from "@/components/domain/character-search/CharacterSearchHistory";
import { useCharacterSearch } from "@/hooks/useCharacterSearch";

export const CharacterSearch = () => {
  const {
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
  } = useCharacterSearch();

  return (
    <div className="relative w-full max-w-3xl" ref={searchContainerRef}>
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="캐릭터 검색"
        className="relative flex w-full items-center gap-2"
      >
        <Select value={world} onValueChange={handleWorldChange}>
          <SelectTrigger
            aria-label="월드 선택"
            className="!h-12 min-w-25 rounded-xs lg:w-31.5"
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

        <Input
          placeholder="캐릭터 이름을 입력하세요"
          className="!h-12 w-full rounded-xs pr-12 placeholder:text-sm"
          value={query}
          onChange={handleQueryChange}
          onFocus={handleInputFocus}
          disabled={isPending}
        />

        <Button
          type="submit"
          variant="ghost"
          size="icon"
          disabled={isPending || !query.trim()}
          className="absolute right-0 mr-0.5 h-[45px] w-12 cursor-pointer rounded-xs hover:bg-transparent"
          aria-label="캐릭터 검색"
        >
          {isPending ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <Search className="size-5" />
          )}
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
