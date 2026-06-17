"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchForm } from "@/shared/ui/search-form";
import {
  FIND_NAME_PARAM,
  FIND_WORLD_PARAM,
  RANKING_SEARCH_NAME_ERROR,
  RANKING_SEARCH_NAME_REGEX,
} from "../model/params";

export function RankingSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (world: string, name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(FIND_WORLD_PARAM, world);
    params.set(FIND_NAME_PARAM, name);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <SearchForm
      // 캐릭터 검색과 최근 검색 기록을 공유한다. 랭킹 표에서 클릭한 캐릭터도 같은 키에 쌓인다.
      historyKey="character-search-history"
      lastWorldKey="character-last-world"
      // 랭킹 카드 안의 보조 컨트롤이라 같은 카드의 h-10 월드 필터와 높이를 맞춘다.
      size="sm"
      placeholder="캐릭터 이름"
      onValidate={(_world, name) => RANKING_SEARCH_NAME_REGEX.test(name)}
      errorMessage={RANKING_SEARCH_NAME_ERROR}
      onSubmit={handleSearch}
    />
  );
}
