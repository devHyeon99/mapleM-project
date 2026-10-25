import type { ReactNode } from "react";
import { CharacterSearch } from "@/features/character-search";

// 동적 세그먼트 위에 두어 다른 이름으로 재검색해도 검색바가 다시 마운트되지 않음
export default function CharactersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="wide:px-0 flex w-full flex-col items-center px-4 py-6">
      <search className="w-full max-w-3xl" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>

      {children}
    </div>
  );
}
