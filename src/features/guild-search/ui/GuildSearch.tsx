"use client";

import { useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/search-form";
import { guildHref } from "@/shared/lib/url";
import { STORAGE_KEYS } from "@/shared/config/constants/storage";

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,12}$/;
const VALIDATION_ERROR_MESSAGE =
  "길드명은 2~12자의 한글, 영어, 숫자만 가능합니다.";

export function GuildSearch() {
  const router = useRouter();

  const handleValidate = (_world: string, name: string): boolean => {
    return VALIDATION_REGEX.test(name);
  };

  const handleSearch = (world: string, name: string) => {
    router.push(guildHref(world, name));
  };

  return (
    <SearchForm
      historyKey={STORAGE_KEYS.GUILD_SEARCH_HISTORY}
      lastWorldKey={STORAGE_KEYS.GUILD_LAST_WORLD}
      placeholder="길드명을 입력하세요"
      onSubmit={handleSearch}
      onValidate={handleValidate}
      errorMessage={VALIDATION_ERROR_MESSAGE}
    />
  );
}
