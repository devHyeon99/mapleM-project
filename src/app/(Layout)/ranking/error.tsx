"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui/button";

export default function RankingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Ranking page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertTriangle className="text-destructive mb-2 size-12" />
      <h2 className="mb-2 text-xl font-medium tracking-tight">
        랭킹 정보를 불러오지 못했습니다
      </h2>
      <p className="text-muted-foreground mb-8 text-sm">
        일시적인 오류가 발생했거나 게임/API 점검 중일 수 있습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </p>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  );
}
