"use client";

import { useSearchHistory } from "@/hooks/useSearchHistory";
import { WORLD_NAMES } from "@/constants/worlds";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type WorldName = (typeof WORLD_NAMES)[number];

interface CharacterSearchHistoryProps {
  onHistorySearch: (name: string, world: WorldName) => void;
}

export const CharacterSearchHistory = ({
  onHistorySearch,
}: CharacterSearchHistoryProps) => {
  const { history, removeHistoryItem, clearAllHistory } = useSearchHistory();

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string,
    world: WorldName,
  ) => {
    e.stopPropagation();
    removeHistoryItem(name, world);
  };

  return (
    <div>
      <h3 className="mb-2 text-base font-semibold">최근 검색 기록</h3>

      {history.length > 0 ? (
        <>
          <ul className="space-y-2">
            {history.map((item) => (
              <li
                key={`${item.name}-${item.world}`}
                className="flex items-center justify-between gap-1 text-sm"
              >
                <Button
                  type="button"
                  variant="outline"
                  className="h-full flex-1 cursor-pointer justify-start rounded-sm !bg-transparent p-2 text-left" // 왼쪽 정렬
                  onClick={() =>
                    onHistorySearch(item.name, item.world as WorldName)
                  }
                  aria-label={`${item.name} (${item.world}) 캐릭터 검색`}
                >
                  <span className="text-sm font-semibold">
                    {item.name}{" "}
                    <strong className="text-muted-foreground font-normal">
                      {item.world}
                    </strong>
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="w-fit flex-shrink-0 cursor-pointer justify-end px-1 hover:!bg-transparent"
                  onClick={(e) =>
                    handleDelete(e, item.name, item.world as WorldName)
                  }
                  aria-label={`${item.name} 검색 기록 삭제`}
                >
                  <X className="size-5 text-red-400" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-4 mr-1 flex justify-end">
            <Button
              type="button"
              variant="link"
              onClick={clearAllHistory}
              className="text-muted-foreground h-auto rounded-none p-0 text-sm underline underline-offset-4"
            >
              전체 삭제
            </Button>
          </div>
        </>
      ) : (
        <p className="text-muted-foreground text-sm font-semibold">
          최근 검색 기록이 없습니다.
        </p>
      )}
    </div>
  );
};
