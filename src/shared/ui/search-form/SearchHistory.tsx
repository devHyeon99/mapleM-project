"use client";

import { Clock, X } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import type { SearchHistoryItem } from "@/shared/lib/hooks/useRecentSearch";

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
  onClose: () => void;
  listId: string;
  labelId: string;
  className?: string;
}

export const SearchHistory = ({
  history,
  onSelect,
  onClear,
  onRemove,
  onClose,
  listId,
  labelId,
  className,
}: SearchHistoryProps) => {
  const hasHistory = history.length > 0;

  return (
    <div
      className={cn(
        "flex h-90 flex-col overflow-hidden rounded-md shadow-md outline-none",
        "text-popover-foreground bg-popover border dark:border-none",
        "focus:ring-ring",
        className,
      )}
    >
      <div className="text-muted-foreground flex items-center justify-between px-4 py-2 text-sm font-medium">
        <span id={labelId}>최근 검색</span>

        {hasHistory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="hover:text-destructive h-auto px-1 py-0 text-sm underline-offset-4 hover:bg-transparent! hover:underline"
            aria-label="최근 검색 기록 전체 삭제"
          >
            전체삭제
          </Button>
        )}
      </div>

      <ul
        id={listId}
        aria-labelledby={labelId}
        role="list"
        className="flex-1 overflow-y-auto"
      >
        {!hasHistory && (
          <li className="text-muted-foreground py-6 text-center text-sm">
            최근 검색 기록이 없습니다.
          </li>
        )}

        {history.map((item) => (
          <HistoryItemRow
            key={item.id}
            item={item}
            onSelect={onSelect}
            onRemove={onRemove}
          />
        ))}
      </ul>

      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="text-muted-foreground focus-visible:ring-ring/60 hover:text-destructive h-10 w-full rounded-none focus-visible:ring-2 focus-visible:ring-inset"
        aria-label="최근 검색 패널 닫기"
      >
        닫기
      </Button>
    </div>
  );
};

const HistoryItemRow = ({
  item,
  onSelect,
  onRemove,
}: {
  item: SearchHistoryItem;
  onSelect: (item: SearchHistoryItem) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <li
      role="button"
      tabIndex={0}
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className={cn(
        "group hover:bg-accent relative flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors outline-none",
      )}
      aria-label={`${item.world} ${item.name} 검색`}
    >
      <div
        className={cn(
          "flex min-w-0 flex-1 items-center gap-2 rounded-sm py-1",
          "group-focus-visible:ring-ring/60 group-focus-visible:ring-[3px]",
        )}
      >
        <Clock
          className="text-muted-foreground/70 size-4 shrink-0"
          aria-hidden="true"
        />
        <span className="truncate font-medium">{item.name}</span>
        <Badge
          variant="secondary"
          className="text-muted-foreground px-1.5 py-0.5 text-xs font-bold"
        >
          {item.world}
        </Badge>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`${item.world} ${item.name} 검색 기록 삭제`}
        className={cn(
          "text-muted-foreground hover:text-destructive hover:bg-destructive/10 size-6",
          "opacity-100",
        )}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </li>
  );
};
