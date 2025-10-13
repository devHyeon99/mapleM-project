"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Clock, X } from "lucide-react";
import { clsx } from "clsx";
import type { SearchHistoryItem } from "@/shared/model/hooks/useRecentSearch";

interface SearchHistoryProps {
  variant?: "default" | "glass";
  history: SearchHistoryItem[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

export const SearchHistory = ({
  variant = "default",
  history,
  onClear,
  onRemove,
}: SearchHistoryProps) => {
  const hasHistory = history.length > 0;
  const isGlass = variant === "glass";

  return (
    <Combobox.Popup
      className={clsx(
        // 1. 기본 레이아웃 및 쉐이프
        "h-69.5 overflow-hidden rounded-md border shadow-md outline-none md:ml-0 md:w-[var(--anchor-width)]",
        "-ml-[138px] w-[calc(var(--anchor-width)+138px)]",

        // 2. 디자인 분기
        isGlass
          ? [
              "text-primary border-white/30 backdrop-blur-3xl",
              "bg-white/35! dark:bg-black/30!",
              "focus:ring-white/50! focus:ring-offset-0",
              "[&_svg]:text-current! [&_svg]:opacity-100",
            ]
          : [
              "border-border bg-popover text-popover-foreground",
              "focus:ring-ring",
            ],
      )}
    >
      {/* 상단 헤더 영역 */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-2 text-sm font-medium",
          isGlass ? "text-primary" : "text-muted-foreground",
        )}
      >
        <span id="recent-search-label">최근 검색</span>

        {hasHistory && (
          <button
            type="button"
            onClick={onClear}
            className={clsx(
              "cursor-pointer underline-offset-4 hover:underline focus-visible:outline-none",
              isGlass ? "" : "hover:text-destructive",
            )}
            aria-label="최근 검색 기록 전체 삭제"
          >
            전체삭제
          </button>
        )}
      </div>

      <Combobox.List
        className="max-h-[300px] overflow-y-auto"
        aria-labelledby="recent-search-label"
      >
        {!hasHistory ? (
          <div
            className={clsx(
              "py-6 text-center text-sm",
              isGlass ? "text-primary" : "text-muted-foreground",
            )}
          >
            최근 검색 기록이 없습니다.
          </div>
        ) : (
          history.map((item) => (
            <Combobox.Item
              key={item.id}
              value={item}
              className={clsx(
                "group relative flex items-center justify-between px-4 py-2 text-sm transition-colors outline-none select-none",
                // 하이라이트(hover/focus) 시 색상 분기
                isGlass
                  ? "data-[highlighted]:bg-black/5 dark:data-[highlighted]:bg-white/10"
                  : "data-[highlighted]:bg-accent/50",
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <Clock
                  className={clsx(
                    "size-4 shrink-0",
                    isGlass ? "text-white/60" : "text-muted-foreground/70",
                  )}
                  aria-hidden="true"
                />
                <span className="truncate font-medium">{item.name}</span>
                <span
                  className={clsx(
                    "shrink-0 rounded px-1.5 py-0.5 text-xs font-bold",
                    isGlass
                      ? "text-primary bg-white/20"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {item.world}
                </span>
              </div>

              {/* 삭제 버튼 */}
              <button
                type="button"
                aria-label={`${item.world} ${item.name} 검색 기록 삭제`}
                className={clsx(
                  "flex size-6 cursor-pointer items-center justify-center rounded-full transition-all focus-visible:outline-none",
                  isGlass
                    ? "text-primary hover:text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                  "opacity-100 md:opacity-0 md:group-data-[highlighted]:opacity-100",
                )}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </Combobox.Item>
          ))
        )}
      </Combobox.List>
    </Combobox.Popup>
  );
};
