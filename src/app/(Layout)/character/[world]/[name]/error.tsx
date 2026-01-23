"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { CharacterSearch } from "@/features/character-search";
import { Button } from "@/shared/ui/button";

export default function CharacterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Character page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-6.5 w-full max-w-3xl px-4 pt-2">
        <CharacterSearch />
      </div>
      <AlertTriangle className="text-destructive mb-2 size-12" />
      <h2 className="mb-2 text-xl font-medium tracking-tight">
        캐릭터 정보를 불러오지 못했습니다
      </h2>
      <p className="text-muted-foreground mb-8 text-sm">
        {error.message || "일시적인 오류가 발생했습니다."}
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  );
}
