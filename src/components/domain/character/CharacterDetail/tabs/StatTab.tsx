"use client";

import { Separator } from "@/shared/ui/separator";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { Search, X } from "lucide-react";
import { useCharacterStatSet } from "@/hooks/useCharacterStat";
import { LoadingCard } from "@/components/common/LoadingCard";
import { aggregateOptions } from "@/utils/aggregateOptions";
import { Button } from "@/shared/ui/button";
import { formatSetName } from "@/utils/formatSetName";

interface StatTabProps {
  ocid: string;
}

export const StatTab = ({ ocid }: StatTabProps) => {
  const { data, isLoading, isError, error } = useCharacterStatSet(ocid);

  if (isLoading) {
    return <LoadingCard message="스탯 및 세트효과 정보 불러오는중..." />;
  }

  if (isError) {
    return (
      <div className="rounded-md border p-3 text-sm text-red-500">
        오류: {(error as Error).message}
      </div>
    );
  }

  if (!data) {
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않아 정보가 표기 되지 않습니다.
        </p>
      </section>
    );
  }

  const { stat, set_effect } = data;

  return (
    <div className="flex flex-col gap-3">
      {/* 스탯 정보 영역 */}
      <section className="rounded-md border p-3">
        <h2 className="mb-2 font-semibold">스탯 정보</h2>
        <Separator className="mb-2" />
        <ul className="space-y-1 text-sm">
          {stat.stat.map((s, idx) => {
            const formattedValue = new Intl.NumberFormat("ko-KR").format(
              Number(s.stat_value),
            );

            return (
              <li key={idx} className="flex justify-between">
                <span>{s.stat_name}</span>
                <span className="font-semibold text-[#FF7E54]">
                  {formattedValue}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 세트 효과 영역 */}
      <section className="rounded-md border p-3">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold">장착중인 장비 세트 효과</h2>
          {set_effect.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  전체보기
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                align="center"
                className="popover-center bg-popover/98 relative w-65 rounded-lg border-2 p-4 shadow-lg"
              >
                <PopoverPrimitive.Close className="absolute top-3 right-3 opacity-70 hover:opacity-100">
                  <X className="h-5 w-5" />
                </PopoverPrimitive.Close>
                <p className="mb-2 font-semibold">
                  장착중인 장비 세트 효과 총합
                </p>
                <Separator className="mb-2" />

                <ul className="flex flex-col gap-1 text-sm">
                  {aggregateOptions(
                    set_effect.flatMap((set) =>
                      set.set_option.split(/,(?!\d{3})/).map((o) => o.trim()),
                    ),
                  ).map((opt, i) => (
                    <li key={i} className="text-muted-foreground">
                      {opt}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          )}
        </div>
        <Separator className="mb-2" />

        {set_effect.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            2025.09.18 API 업데이트 이후 접속하지 않았거나,
            <br />
            장착중인 장비 세트 효과가 없습니다.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {set_effect.map((set, idx) => (
              <li key={idx}>
                <div className="flex items-center justify-between gap-1">
                  <span className="font-medium">
                    {set.set_name}{" "}
                    <span className="text-[#FF7E54]">({set.set_count})</span>
                  </span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                        aria-label={`${set.set_name} 옵션 보기`}
                      >
                        <Search className="size-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="right"
                      align="center"
                      className="popover-center bg-popover/98 relative w-65 rounded-lg border-2 p-4 shadow-lg"
                    >
                      <PopoverPrimitive.Close className="absolute top-3 right-3 opacity-70 hover:opacity-100">
                        <X className="h-5 w-5" />
                      </PopoverPrimitive.Close>
                      <p className="mb-2 font-semibold">
                        {formatSetName(set.set_name, set.set_count)}
                      </p>
                      <Separator className="mb-2" />
                      <ul className="flex flex-col gap-1">
                        {set.set_option
                          .split(/,(?!\d{3})/)
                          .map((opt) => opt.trim())
                          .map((opt, i) => (
                            <li
                              key={i}
                              className="text-muted-foreground text-sm"
                            >
                              {opt}
                            </li>
                          ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
