"use client";

import { useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/search-form";
import { ALL_WORLD_NAME } from "@/shared/config/constants/worlds";
import { characterHref } from "@/shared/lib/url";
import { STORAGE_KEYS } from "@/shared/config/constants/storage";
import {
  CHARACTER_NAME_ERROR,
  CHARACTER_NAME_REGEX,
} from "@/shared/config/constants/character";

export const CharacterSearch = () => {
  const router = useRouter();

  const handleValidate = (_world: string, name: string) => {
    return CHARACTER_NAME_REGEX.test(name);
  };

  const handleSearch = (world: string, name: string) => {
    const path =
      world === ALL_WORLD_NAME
        ? `/characters/${encodeURIComponent(name)}`
        : characterHref(world, name);

    router.push(path);
  };

  return (
    <SearchForm
      historyKey={STORAGE_KEYS.CHARACTER_SEARCH_HISTORY}
      lastWorldKey={STORAGE_KEYS.CHARACTER_LAST_WORLD}
      placeholder="캐릭터 이름을 입력하세요"
      onValidate={handleValidate}
      errorMessage={CHARACTER_NAME_ERROR}
      onSubmit={handleSearch}
      includeAllWorld={true}
    />
  );
};
