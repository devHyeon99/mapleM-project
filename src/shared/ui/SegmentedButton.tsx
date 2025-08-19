import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface SegmentedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean; // 현재 내가 선택한 버튼인가?
  children: ReactNode;
}

export const SegmentedButton = ({
  isSelected,
  className,
  children,
  ...props
}: SegmentedButtonProps) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected} // 접근성: 눌린 상태 알림
      className={cn(
        "relative flex h-7 w-7.5 items-center justify-center rounded-sm text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
        isSelected
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
