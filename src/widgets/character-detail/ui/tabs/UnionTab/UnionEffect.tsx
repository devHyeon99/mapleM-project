"use client";

import type { ReactNode } from "react";
import { TabCard } from "@/shared/ui/TabCard";
import { formatQueryError } from "@/shared/ui/TabMessageSection";
import { InfoRow } from "@/shared/ui/InfoRow";
import { cn } from "@/shared/lib/utils";
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

/** 로딩·실패·빈 상태 안내. 목록과 높이를 맞춰 카드 크기가 튀지 않게 한다 */
const EffectStatus = ({
  children,
  isError,
  className,
}: {
  children: ReactNode;
  isError?: boolean;
  className?: string;
}) => (
  <div
    role={isError ? "alert" : undefined}
    className={cn(
      "flex h-48 items-center justify-center text-sm",
      isError ? "text-destructive font-medium" : "text-muted-foreground",
      className,
    )}
  >
    {children}
  </div>
);

export const UnionEffect = ({
  title,
  options,
  isLoading,
  error,
  className,
}: UnionEffectProps) => {
  const renderBody = () => {
    if (error !== undefined)
      return <EffectStatus isError>{formatQueryError(error)}</EffectStatus>;

    if (isLoading)
      return <EffectStatus className="text-xs">로딩 중...</EffectStatus>;

    const parsedList = parseUnionOptions(options);
    if (parsedList.length === 0)
      return <EffectStatus>활성화된 효과가 없습니다.</EffectStatus>;

    return (
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
    );
  };

  return (
    <TabCard title={title} className={className}>
      {renderBody()}
    </TabCard>
  );
};
