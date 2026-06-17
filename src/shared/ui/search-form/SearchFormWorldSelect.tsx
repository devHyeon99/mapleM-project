"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/lib/utils";

interface SearchFormWorldSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly string[];
  /** 높이·폭은 SearchFormField 의 size 설정에서 내려온다. */
  className?: string;
}

export function SearchFormWorldSelect({
  value,
  onValueChange,
  options,
  className,
}: SearchFormWorldSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        aria-label="월드 선택"
        className={cn(
          "bg-card dark:bg-input/50 relative z-0 rounded-r-none focus-visible:z-10 focus-visible:ring-2",
          className,
        )}
      >
        <SelectValue placeholder="월드" />
      </SelectTrigger>
      <SelectContent
        position="popper"
        sideOffset={1}
        // 기본 center 정렬이면 목록이 트리거보다 넓어질 때 좌우로 삐져나온다.
        align="start"
        // SelectContent 기본값이 min-w-36 이라 트리거를 좁혀도 목록은 그대로 넓다.
        // 트리거 폭을 그대로 따라가게 한다.
        className="border ring-0 min-w-(--radix-select-trigger-width)"
      >
        {options.map((world) => (
          <SelectItem key={world} value={world}>
            {world}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
