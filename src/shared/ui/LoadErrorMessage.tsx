"use client";

import { useEffect, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

interface LoadErrorMessageProps {
  /** 무엇을 못 불러왔는지. 완성된 문장으로 넣음 */
  title: string;
  /** error.tsx 가 받은 값을 그대로 넘김 */
  error: Error & { digest?: string };
  reset: () => void;
  /** 라우트마다 다른 바깥 여백 */
  className?: string;
  /** 제목 위 슬롯. 캐릭터 페이지의 검색바처럼 화면별로 더 얹을 것 */
  children?: ReactNode;
}

/**
 * 에러 바운더리(error.tsx)의 공통 화면.
 * 재시도가 없는 not-found 쪽은 NotFoundMessage 를 씀.
 */
export const LoadErrorMessage = ({
  title,
  error,
  reset,
  className,
  children,
}: LoadErrorMessageProps) => {
  useEffect(() => {
    console.error(`${title}:`, error);
  }, [title, error]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className,
      )}
    >
      {children}
      <AlertTriangle className="text-destructive mb-2 size-12" />
      <h2 className="mb-2 text-xl font-medium tracking-tight">{title}</h2>
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
};
