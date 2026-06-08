import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { Separator } from "@/shared/ui/separator";

interface TabCardProps {
  /** 카드 제목. 없으면 헤더와 구분선을 렌더링하지 않음 */
  title?: string;
  /** 제목 우측 컨트롤 (프리셋 토글, 도움말, 요약 값 등) */
  action?: ReactNode;
  /** 헤더 아래 구분선 숨김 */
  hideSeparator?: boolean;
  className?: string;
  children: ReactNode;
}

export const TabCard = ({
  title,
  action,
  hideSeparator,
  className,
  children,
}: TabCardProps) => {
  return (
    <section
      aria-label={title}
      className={cn(
        "bg-card flex w-full flex-col rounded-2xl p-4 shadow-sm",
        className,
      )}
    >
      {title && (
        <>
          <div
            className={cn(
              "flex min-h-8 items-center justify-between gap-2",
              hideSeparator && "mb-2",
            )}
          >
            <h3 className="font-bold">{title}</h3>
            {action}
          </div>
          {!hideSeparator && <Separator className="my-2" />}
        </>
      )}
      {children}
    </section>
  );
};
