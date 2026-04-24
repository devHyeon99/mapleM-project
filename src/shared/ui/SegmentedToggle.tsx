"use client";

import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";
import { Label } from "@/shared/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface SegmentedToggleOption<T extends string | number> {
  value: T;
  /** 버튼에 보여줄 내용. 없으면 value를 그대로 표시 */
  content?: ReactNode;
  /** 아이콘만 있는 항목처럼 텍스트로 이름을 알 수 없을 때 */
  ariaLabel?: string;
  /** 인게임에서 실제 적용 중인 항목 표시용 점 */
  marked?: boolean;
}

interface SegmentedToggleProps<T extends string | number> {
  options: SegmentedToggleOption<T>[];
  value?: T | null;
  onChange: (value: T) => void;
  /** 컨트롤 위에 노출되는 라벨. 그룹의 접근성 이름도 겸한다 */
  label?: string;
  /** 라벨을 노출하지 않는 경우의 접근성 이름 */
  ariaLabel?: string;
  className?: string;
}

/** 프리셋 / 보기 방식 / 모드처럼 화면을 전환하는 공용 세그먼트 컨트롤 */
export const SegmentedToggle = <T extends string | number>({
  options,
  value,
  onChange,
  label,
  ariaLabel,
  className,
}: SegmentedToggleProps<T>) => {
  if (options.length === 0) return null;

  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      {label && (
        <Label className="text-muted-foreground text-xs">{label}</Label>
      )}
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        spacing={2}
        aria-label={ariaLabel ?? label}
        value={value != null ? String(value) : ""}
        onValueChange={(next) => {
          const selected = options.find((o) => String(o.value) === next);
          if (selected) onChange(selected.value);
        }}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={String(option.value)}
            aria-label={option.ariaLabel}
            className="relative text-xs font-semibold"
          >
            {option.content ?? option.value}
            {option.marked && (
              <span
                className="absolute top-1.5 right-1 size-1 rounded-full bg-orange-400"
                aria-hidden="true"
              />
            )}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
