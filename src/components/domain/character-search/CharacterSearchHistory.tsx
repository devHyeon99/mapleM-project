"use client";

import { useSearchHistory } from "@/hooks/useSearchHistory";
import { WORLD_NAMES } from "@/constants/worlds";
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
    e.stopPropagation(); // 상위 검색 버튼 이벤트 실행 방지
    removeHistoryItem(name, world);
  };

  return (
    <div>
      <h3 className="mb-2 text-base font-semibold">최근 검색 기록</h3>

      {history.length > 0 ? (
        <>
          <ul className="space-y-1">
            {history.map((item, index) => (
              <li
                key={index}
                className="relative flex items-center justify-between text-sm"
              >
                <button
                  type="button"
                  onClick={() =>
                    onHistorySearch(item.name, item.world as WorldName)
                  }
                  className="bg-card hover:bg-input/50 h-full flex-1 cursor-pointer rounded border p-2 text-left"
                  aria-label={`${item.name} (${item.world}) 캐릭터 검색`}
                >
                  <span className="text-sm font-semibold">
                    {item.name}{" "}
                    <strong className="text-muted-foreground font-normal">
                      {item.world}
                    </strong>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    handleDelete(e, item.name, item.world as WorldName)
                  }
                  className="absolute right-2 cursor-pointer"
                  aria-label={`${item.name} 검색 기록 삭제`}
                >
                  <X className="size-5" />
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={clearAllHistory}
            className="text-muted-foreground absolute right-4 mt-2 w-fit cursor-pointer text-right text-sm underline underline-offset-4"
          >
            전체 삭제
          </button>
        </>
      ) : (
        <p className="text-muted-foreground text-sm font-semibold">
          최근 검색 기록이 없습니다.
        </p>
      )}
    </div>
  );
};
