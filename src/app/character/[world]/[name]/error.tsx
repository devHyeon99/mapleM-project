"use client";

import { CharacterSearch } from "@/features/character-search";
import { LoadErrorMessage } from "@/shared/ui/LoadErrorMessage";

export default function CharacterError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LoadErrorMessage title="캐릭터 정보를 불러오지 못했습니다" {...props}>
      <div className="mb-6.5 w-full max-w-3xl px-4 pt-2">
        <CharacterSearch />
      </div>
    </LoadErrorMessage>
  );
}
