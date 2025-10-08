"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Clock, X } from "lucide-react";
import { clsx } from "clsx";
import type { SearchHistoryItem } from "@/shared/model/hooks/useRecentSearch";

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

export const SearchHistory = ({
  history,
  onClear,
  onRemove,
}: SearchHistoryProps) => {
  const hasHistory = history.length > 0;

  return (
    <Combobox.Popup
      className={clsx(
        "text-popover-foreground h-69.5 overflow-hidden rounded-md border bg-white shadow-md outline-none dark:bg-[#181818]",
        "-ml-[138px] w-[calc(var(--anchor-width)+138px)]",
        "md:ml-0 md:w-[var(--anchor-width)]",
      )}
    >
      <div className="text-muted-foreground flex items-center justify-between px-4 py-2 text-sm font-medium">
        <span id="recent-search-label">최근 검색</span>

        {hasHistory && (
          <button
            type="button"
            onClick={onClear}
            className="hover:text-destructive focus-visible:ring-ring cursor-pointer underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
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
          <div className="text-muted-foreground py-6 text-center text-sm">
            최근 검색 기록이 없습니다.
          </div>
        ) : (
          history.map((item) => (
            <Combobox.Item
              key={item.id}
              value={item}
              className={clsx(
                "group relative flex items-center justify-between px-4 py-2 text-sm outline-none select-none",
                "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <Clock
                  className="text-muted-foreground/70 size-4 shrink-0"
                  aria-hidden="true"
                />
                <span className="truncate font-medium">{item.name}</span>
                <span className="bg-secondary text-muted-foreground shrink-0 rounded px-1.5 py-0.5 text-xs">
                  {item.world}
                </span>
              </div>

              <button
                type="button"
                aria-label={`${item.world} ${item.name} 검색 기록 삭제`}
                className={clsx(
                  "text-muted-foreground hover:text-destructive focus-visible:ring-ring flex size-6 cursor-pointer items-center justify-center rounded-full transition-opacity focus:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none",
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
                <X className="size-5" aria-hidden="true" />
              </button>
            </Combobox.Item>
          ))
        )}
      </Combobox.List>
    </Combobox.Popup>
  );
};
