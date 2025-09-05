import { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface InfoRowProps {
  label: string;
  children: ReactNode;
  className?: string;
  /** * 최상위 컨테이너 태그
   * @default "div"
   */
  as?: ElementType;
  /**
   * 레이아웃 정렬 방식
   */
  variant?: "between" | "start";
  /** variant가 "start"일 때 적용할 간격 */
  gap?: string;
  /** * 숫자의 너비를 일정하게 유지 (tabular-nums)
   * @default false
   */
  isNumeric?: boolean;
  /** * 값(Value) 텍스트 강조 여부 (현재 다크모드 전용)
   * @default false
   */
  isHighlight?: boolean;
  labelClassName?: string;
  valueClassName?: string;
}

export const InfoRow = ({
  label,
  children,
  className,
  as: Component = "div",
  variant = "start",
  gap = "gap-1",
  isNumeric = false,
  isHighlight = false,
  labelClassName,
  valueClassName,
}: InfoRowProps) => {
  const LabelTag = Component === "div" ? "dt" : "span";
  const ValueTag = Component === "div" ? "dd" : "span";

  return (
    <Component
      className={cn(
        "flex items-center text-sm",
        variant === "between" ? "justify-between" : cn("justify-start", gap),
        className,
      )}
    >
      <LabelTag
        className={cn("text-muted-foreground shrink-0", labelClassName)}
      >
        {label}
      </LabelTag>
      <ValueTag
        className={cn(
          "shrink-0 font-medium",
          // 조건부 tabular-nums 적용
          isNumeric && "tabular-nums",
          // 다크모드에서만 하이라이트 색상 적용, 라이트모드는 기본 foreground 유지
          isHighlight ? "text-[#FF7E54]" : "text-foreground",
          valueClassName,
        )}
      >
        {children}
      </ValueTag>
    </Component>
  );
};
