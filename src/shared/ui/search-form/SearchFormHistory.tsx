"use client";

import { Clock, X } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import type { SearchHistoryItem } from "@/shared/lib/hooks/useRecentSearch";

interface SearchFormHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (item: SearchHistoryItem) => void;
  onClear: () => void;
  onRemove: (id: string) => void;
  onClose: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  labelId: string;
  className?: string;
}

export const SearchFormHistory = ({
  history,
  onSelect,
  onClear,
  onRemove,
  onClose,
  containerRef,
  labelId,
  className,
}: SearchFormHistoryProps) => {
  const hasHistory = history.length > 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex max-h-90 flex-col overflow-hidden rounded-xl shadow-md outline-none",
        "text-popover-foreground bg-popover border",
        "focus:ring-ring",
        className,
      )}
    >
      <div className="text-muted-foreground flex items-center justify-between px-4 py-2 text-sm font-medium">
        <span id={labelId}>최근 검색</span>

        {hasHistory && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="hover:text-destructive h-auto px-1 py-0 text-sm hover:bg-transparent!"
            aria-label="최근 검색 기록 전체 삭제"
          >
            전체삭제
          </Button>
        )}
      </div>

      <ul
        aria-labelledby={labelId}
        role="list"
        className="min-h-0 flex-1 overflow-y-auto"
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
        className="dark:hover:bg-input/50 text-muted-foreground focus-visible:ring-ring/60 hover:text-destructive h-10 w-full rounded-none focus-visible:ring-2 focus-visible:ring-inset"
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
    <li className="hover:bg-accent flex items-center pr-2 text-sm transition-colors">
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-label={`${item.world} ${item.name} 검색`}
        className={cn(
          "flex min-w-0 flex-1 cursor-pointer items-center gap-2 py-3 pl-4 text-left outline-none",
          "focus-visible:ring-ring/60 focus-visible:ring-[3px] focus-visible:ring-inset",
        )}
      >
        <Clock
          className="text-muted-foreground/70 size-4 shrink-0"
          aria-hidden="true"
        />
        <span className="truncate font-medium">{item.name}</span>
        <Badge
          variant="secondary"
          className="bg-input/30! text-muted-foreground px-1.5 py-0.5 text-xs font-bold"
        >
          {item.world}
        </Badge>
      </button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`${item.world} ${item.name} 검색 기록 삭제`}
        className="text-muted-foreground hover:text-destructive size-8 shrink-0"
        onClick={() => onRemove(item.id)}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </li>
  );
};
