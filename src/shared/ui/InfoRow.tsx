import { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface InfoRowProps {
  label: string;
  children: ReactNode;
  className?: string;
  /**
   * 최상위 컨테이너 태그
   * @default "div"
   */
  as?: ElementType;
  /**
   * 레이아웃 정렬 방식
   */
  variant?: "between" | "start";
  /**
   * 라벨/값 시맨틱 태그 사용 여부
   * - description: dt/dd
   * - plain: span/span
   * @default "plain"
   */
  semantic?: "description" | "plain";
  /**
   * 숫자의 너비를 일정하게 유지 (tabular-nums)
   * @default false
   */
  isNumeric?: boolean;
  /**
   * 값(Value) 텍스트 강조 여부 (현재 다크모드 전용)
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
  semantic = "plain",
  isNumeric = false,
  isHighlight = false,
  labelClassName,
  valueClassName,
}: InfoRowProps) => {
  const LabelTag = semantic === "description" ? "dt" : "span";
  const ValueTag = semantic === "description" ? "dd" : "span";

  return (
    <Component
      className={cn(
        "flex items-center text-sm",
        variant === "between" ? "justify-between" : "justify-start gap-2",
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
          isNumeric && "tabular-nums",
          isHighlight ? "text-orange-400" : "text-foreground",
          valueClassName,
        )}
      >
        {children}
      </ValueTag>
    </Component>
  );
};

type InfoDescriptionRowProps = Omit<InfoRowProps, "semantic">;

export const InfoDescriptionRow = (props: InfoDescriptionRowProps) => {
  return <InfoRow {...props} semantic="description" />;
};
