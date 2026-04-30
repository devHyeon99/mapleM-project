import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ItemOptionRowProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  valueAriaLabel?: string;
}

/** 아이템 상세 다이얼로그의 "옵션명 - 값" 한 줄 (dl 안에서 사용) */
export const ItemOptionRow = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
  valueAriaLabel,
}: ItemOptionRowProps) => {
  return (
    <div className={cn("grid grid-cols-[max-content_1fr] gap-x-2", className)}>
      <dt className={cn("whitespace-nowrap", labelClassName)}>{label}</dt>
      <dd
        className={cn("text-right tabular-nums", valueClassName)}
        aria-label={valueAriaLabel}
      >
        {value}
      </dd>
    </div>
  );
};
