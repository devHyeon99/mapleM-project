"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/SearchForm";
import { useRecentSearch } from "@/shared/model/hooks/useRecentSearch";

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
const VALIDATION_ERROR_MESSAGE =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";

export const CharacterSearch = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { history, addHistory, removeHistory, clearHistory } = useRecentSearch(
    "character-search-history",
  );

  const handleValidate = (world: string, name: string): boolean => {
    return VALIDATION_REGEX.test(name);
  };

  const handleSearch = (world: string, name: string) => {
    addHistory(name, world);

    const path =
      world === "전체"
        ? `/characters/${encodeURIComponent(name)}`
        : `/character/${encodeURIComponent(world)}/${encodeURIComponent(name)}`;

    startTransition(() => {
      router.push(path);
    });
  };

  return (
    <div className="w-full max-w-3xl">
      <SearchForm
        lastWorldKey="character-last-world"
        placeholder="캐릭터 이름을 입력하세요"
        history={history}
        onHistoryRemove={removeHistory}
        onHistoryClear={clearHistory}
        onValidate={handleValidate}
        errorMessage={VALIDATION_ERROR_MESSAGE}
        onSubmit={handleSearch}
        includeAllWorld={true}
        isPending={isPending}
      />
    </div>
  );
};
