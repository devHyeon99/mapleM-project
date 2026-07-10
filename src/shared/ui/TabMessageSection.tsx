import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface TabMessageSectionProps {
  className?: string;
  message?: string;
  children?: ReactNode;
  error?: Error | null;
}

export const TabMessageSection = ({
  className,
  message,
  children,
  error,
}: TabMessageSectionProps) => {
  const isError = error !== undefined;
  const text = isError
    ? `오류 발생: ${error?.message ?? "알 수 없는 오류가 발생했습니다."}`
    : message;

  return (
    <section
      role={isError ? "alert" : undefined}
      className={cn(
        "bg-card flex h-full min-h-91.5 flex-col items-center justify-center gap-2 rounded-2xl p-6 text-center shadow-sm",
        className,
      )}
    >
      {text ? (
        <p
          className={cn(
            "text-sm whitespace-pre-line",
            isError ? "text-destructive font-medium" : "text-muted-foreground",
          )}
        >
          {text}
        </p>
      ) : (
        children
      )}
    </section>
  );
};
