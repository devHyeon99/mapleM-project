"use client";

import { useId } from "react";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import type { UnionOption } from "@/entities/character";

interface UnionEffectProps {
  title: string;
  options: string | UnionOption[] | null | undefined;
  contentHeight?: string;
  isLoading?: boolean;
  className?: string;
}

export const UnionEffect = ({
  title,
  options,
  contentHeight = "h-48",
  isLoading,
  className,
}: UnionEffectProps) => {
  const titleId = useId();

  // 데이터 타입에 따른 파싱 로직 (콤마 보호 정규식 유지)
  const getParsedList = () => {
    if (!options) return [];
    if (Array.isArray(options)) {
      return options.map((opt) => `${opt.option_name} ${opt.option_value}`);
    }
    return options.split(/,(?!\d)/).map((opt) => opt.trim());
  };

  const parsedList = getParsedList();
  const splitOptionValue = (option: string) => {
    const trimmed = option.trim();
    const match = trimmed.match(/^(.*\S)\s+([-+]?\d[\d,]*(?:\.\d+)?%?)$/);
    if (!match) {
      return { label: trimmed, value: null as string | null };
    }
    return { label: match[1], value: match[2] };
  };

  return (
    <section
      aria-labelledby={titleId}
      className={cn("bg-card flex w-full flex-col p-4 shadow-sm", className)}
    >
      <h3 id={titleId} className="text-base font-bold">
        {title}
      </h3>
      <Separator className="my-2" />

      {isLoading ? (
        <div
          className={cn(
            "text-muted-foreground flex items-center justify-center text-xs",
            contentHeight,
          )}
        >
          로딩 중...
        </div>
      ) : parsedList.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {parsedList.map((option, idx) => {
            const { label, value } = splitOptionValue(option);
            return (
              <li
                key={`${option}-${idx}`}
                className="flex items-start justify-between gap-2 text-sm leading-relaxed"
              >
                <span className="text-muted-foreground">{label}</span>
                {value ? (
                  <span className="font-medium text-orange-400">{value}</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <div
          className={cn(
            "text-muted-foreground flex items-center justify-center text-sm",
            contentHeight,
          )}
        >
          활성화된 효과가 없습니다.
        </div>
      )}
    </section>
  );
};
