"use client";

import { usePathname, useRouter } from "next/navigation";
import { SearchForm } from "@/shared/ui/search-form";
import {
  rankingSearchParams,
  RANKING_SEARCH_NAME_ERROR,
  RANKING_SEARCH_NAME_REGEX,
} from "../model/params";

export function RankingSearchForm() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (world: string, name: string) => {
    // 현재 경로(랭킹 종류·월드·페이지)는 두고 검색 조건만 갈아끼운다.
    router.replace(`${pathname}?${rankingSearchParams({ world, name })}`, {
      scroll: false,
    });
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
