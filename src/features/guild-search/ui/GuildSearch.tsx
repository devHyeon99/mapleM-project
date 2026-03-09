"use client";

import { useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/search-form";

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,12}$/;
const VALIDATION_ERROR_MESSAGE =
  "길드명은 2~12자의 한글, 영어, 숫자만 가능합니다.";

export function GuildSearch() {
  const router = useRouter();

  const handleValidate = (world: string, name: string): boolean => {
    return VALIDATION_REGEX.test(name);
  };

  const handleSearch = (world: string, name: string) => {
    router.push(
      `/guild/${encodeURIComponent(world)}/${encodeURIComponent(name)}`,
    );
  };

  return (
    <SearchForm
      label="길드 검색"
      historyKey="guild-search-history"
      lastWorldKey="guild-last-world"
      placeholder="길드명을 입력하세요"
      onSubmit={handleSearch}
      onValidate={handleValidate}
      errorMessage={VALIDATION_ERROR_MESSAGE}
    />
  );
}
