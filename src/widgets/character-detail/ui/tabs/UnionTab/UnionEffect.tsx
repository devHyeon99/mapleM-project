"use client";

import { TabCard } from "@/shared/ui/TabCard";
import { formatQueryError } from "@/shared/ui/TabMessageSection";
import { InfoRow } from "@/shared/ui/InfoRow";
import {
  parseUnionOptions,
  splitUnionOptionValue,
} from "@/widgets/character-detail/lib/parseUnionOptions";
import type { UnionOption } from "@/entities/character";

interface UnionEffectProps {
  title: string;
  options: string | UnionOption[] | null | undefined;
  isLoading?: boolean;
  error?: Error | null;
  className?: string;
}

export const UnionEffect = ({
  title,
  options,
  isLoading,
  error,
  className,
}: UnionEffectProps) => {
  const parsedList = parseUnionOptions(options);

  return (
    <TabCard title={title} className={className}>
      {error !== undefined ? (
        <div
          role="alert"
          className="text-destructive flex h-48 items-center justify-center text-sm font-medium"
        >
          {formatQueryError(error)}
        </div>
      ) : isLoading ? (
        <div className="text-muted-foreground flex h-48 items-center justify-center text-xs">
          로딩 중...
        </div>
      ) : parsedList.length > 0 ? (
        <ul className="flex flex-col gap-1">
          {parsedList.map((option, idx) => {
            const { label, value } = splitUnionOptionValue(option);
            return (
              <InfoRow
                key={`${option}-${idx}`}
                as="li"
                variant="between"
                isHighlight
                label={label}
                className="items-start leading-relaxed"
                labelClassName="shrink"
              >
                {value}
              </InfoRow>
            );
          })}
        </ul>
      ) : (
        <div className="text-muted-foreground flex h-48 items-center justify-center text-sm">
          활성화된 효과가 없습니다.
        </div>
      )}
    </TabCard>
  );
};
