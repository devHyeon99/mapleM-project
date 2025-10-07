"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/SearchForm";
import { useRecentSearch } from "@/shared/model/hooks/useRecentSearch";

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,12}$/;
const VALIDATION_ERROR_MESSAGE =
  "길드명은 2~12자의 한글, 영어, 숫자만 가능합니다.";

export function GuildSearch() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { history, addHistory, removeHistory, clearHistory } = useRecentSearch(
    "guild-search-history",
  );

  const handleValidate = (world: string, name: string): boolean => {
    return VALIDATION_REGEX.test(name);
  };

  const handleSearch = (world: string, name: string) => {
    addHistory(name, world);

    startTransition(() => {
      router.push(
        `/guild/${encodeURIComponent(world)}/${encodeURIComponent(name)}`,
      );
    });
  };

  return (
    <SearchForm
      lastWorldKey="guild-last-world"
      placeholder="길드명을 입력하세요"
      history={history}
      onHistoryRemove={removeHistory}
      onHistoryClear={clearHistory}
      onSubmit={handleSearch}
      isPending={isPending}
      onValidate={handleValidate}
      errorMessage={VALIDATION_ERROR_MESSAGE}
    />
  );
}
