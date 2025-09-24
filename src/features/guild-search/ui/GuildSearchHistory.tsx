"use client";

import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { Button } from "@/shared/ui/button";
import { X } from "lucide-react";
import { useGuildSearchHistory } from "../mode/useGuildSearchHistory";

type WorldName = (typeof WORLD_NAMES)[number];

interface GuildSearchHistoryProps {
  onHistorySearch: (name: string, world: WorldName) => void;
}

export const GuildSearchHistory = ({
  onHistorySearch,
}: GuildSearchHistoryProps) => {
  const { history, removeHistoryItem, clearAllHistory } =
    useGuildSearchHistory();

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
    world: WorldName,
  ) => {
    e.stopPropagation();
    removeHistoryItem(name, world);
  };

  return (
    <div className="w-full">
      <h3 className="mb-2 text-left text-base font-semibold">최근 검색 기록</h3>

      {history.length > 0 ? (
        <>
          <ul className="space-y-1">
            {history.map((item) => (
              <li
                key={`${item.name}-${item.world}`}
                className="flex items-center justify-between gap-1 rounded-sm text-sm transition-colors"
              >
                <Button
                  type="button"
                  variant="ghost"
                  className="h-9 flex-1 cursor-pointer justify-start px-2 py-1 text-left shadow-none"
                  onClick={() =>
                    onHistorySearch(item.name, item.world as WorldName)
                  }
                  aria-label={`${item.world} 서버 ${item.name} 길드 검색`}
                >
                  <span className="text-sm font-semibold">
                    {item.name}{" "}
                    <span className="text-muted-foreground ml-1 font-normal">
                      {item.world}
                    </span>
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="flex h-9 w-9 cursor-pointer hover:bg-transparent"
                  onClick={(e) =>
                    handleDelete(e, item.name, item.world as WorldName)
                  }
                  aria-label={`${item.name} 길드 검색 기록 삭제`}
                >
                  <X className="text-destructive size-5" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              variant="link"
              onClick={clearAllHistory}
              className="text-muted-foreground h-auto cursor-pointer p-0 text-xs underline-offset-4 hover:underline"
            >
              전체 삭제
            </Button>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-left text-sm font-medium">
          최근 검색 기록이 없습니다.
        </p>
      )}
    </div>
  );
};
