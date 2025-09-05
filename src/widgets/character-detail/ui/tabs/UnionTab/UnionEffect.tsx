"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import type { UnionOption } from "@/entities/character";

interface UnionEffectProps {
  title: string;
  options: string | UnionOption[] | null | undefined;
  contentHeight?: string;
  isLoading?: boolean;
}

export const UnionEffect = ({
  title,
  options,
  contentHeight = "h-48",
  isLoading,
}: UnionEffectProps) => {
  // 데이터 타입에 따른 파싱 로직 (콤마 보호 정규식 유지)
  const getParsedList = () => {
    if (!options) return [];
    if (Array.isArray(options)) {
      return options.map((opt) => `${opt.option_name} ${opt.option_value}`);
    }
    return options.split(/,(?!\d)/).map((opt) => opt.trim());
  };

  const parsedList = getParsedList();

  return (
    <section className="flex w-full flex-col rounded-md border p-3">
      <h2 className="mb-2 text-sm font-bold">{title}</h2>
      <Separator className="mb-2" />

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
        <div className="relative">
          <ScrollArea
            className={cn(
              contentHeight,
              "pr-3",
              "[mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]",
            )}
            type="always"
          >
            <ul className="flex flex-col gap-1 pb-6">
              {parsedList.map((option, idx) => (
                <li
                  key={idx}
                  className="text-muted-foreground text-xs leading-relaxed"
                >
                  <span className="text-foreground/90">- {option}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      ) : (
        <div
          className={cn(
            "text-muted-foreground flex items-center justify-center text-xs italic",
            contentHeight,
          )}
        >
          활성화된 효과가 없습니다.
        </div>
      )}
    </section>
  );
};
