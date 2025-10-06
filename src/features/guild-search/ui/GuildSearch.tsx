"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Search, Loader2 } from "lucide-react";
import { GuildSearchHistory } from "./GuildSearchHistory";
import { cn } from "@/shared/lib/utils";
import { useGuildSearch } from "../mode/useGuildSearch";

export const GuildSearch = () => {
  const {
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
  } = useGuildSearch();

  const isInvalid = Boolean(error);

  return (
    <div className="relative w-full max-w-4xl" ref={searchContainerRef}>
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="길드 검색"
        className="relative flex w-full items-center gap-2"
      >
        <Select value={world} onValueChange={handleWorldChange} name="world">
          <SelectTrigger
            aria-label="월드 선택"
            className="!h-12 min-w-32 rounded-xs lg:w-31.5"
            disabled={isPending}
          >
            <SelectValue placeholder="월드" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="font-bold">월드 목록</SelectLabel>
              {validWorlds.map((w) => (
                <SelectItem key={w} value={w}>
                  {w}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Input
            id="guild-search-input"
            name="guildName"
            placeholder="길드명을 입력하세요"
            aria-invalid={isInvalid}
            className={cn(
              "!h-12 w-full rounded-xs pr-12 transition-colors placeholder:text-sm",
              error &&
                "border-destructive ring-destructive/20 focus-visible:ring-destructive",
            )}
            value={guildName}
            onChange={handleQueryChange}
            onFocus={handleInputFocus}
            disabled={isPending}
            autoComplete="off"
          />

          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={isPending}
            className="absolute top-1/2 right-0 mr-0.5 h-[45px] w-12 -translate-y-1/2 cursor-pointer rounded-xs hover:bg-transparent"
            aria-label="길드 검색"
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Search className={cn("size-5", error && "text-destructive")} />
            )}
          </Button>
        </div>
      </form>

      {/* 에러 메시지 텍스트 추가 */}
      {error && (
        <p className="text-destructive animate-in fade-in slide-in-from-top-1 mt-2 pl-1 text-right text-xs font-medium">
          {error}
        </p>
      )}

      {showHistory && !error && (
        <div className="bg-card absolute right-0 z-10 mt-1 min-h-85 w-full rounded-xs border p-4 lg:w-[calc(100%-136px)]">
          <GuildSearchHistory onHistorySearch={handleHistorySearch} />
        </div>
      )}
    </div>
  );
};
