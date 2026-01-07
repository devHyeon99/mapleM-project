"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/search-form";
import { ALL_WORLD_NAME } from "@/shared/config/constants/worlds";

const VALIDATION_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
const VALIDATION_ERROR_MESSAGE =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";

export const CharacterSearch = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const normalizeName = (name: string) => name.trim();

  const handleValidate = (_world: string, name: string) => {
    return VALIDATION_REGEX.test(normalizeName(name));
  };

  const handleSearch = (world: string, name: string) => {
    if (isPending) return;

    const normalized = normalizeName(name);

    const path =
      world === ALL_WORLD_NAME
        ? `/characters/${encodeURIComponent(normalized)}`
        : `/character/${encodeURIComponent(world)}/${encodeURIComponent(normalized)}`;

    startTransition(() => router.push(path));
  };

  return (
    <SearchForm
      historyKey="character-search-history"
      lastWorldKey="character-last-world"
      placeholder="캐릭터 이름을 입력하세요"
      onValidate={handleValidate}
      errorMessage={VALIDATION_ERROR_MESSAGE}
      onSubmit={handleSearch}
      includeAllWorld={true}
      isPending={isPending}
    />
  );
};
