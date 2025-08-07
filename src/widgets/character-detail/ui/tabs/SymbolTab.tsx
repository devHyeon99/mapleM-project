"use client";

import Image from "next/image";
import { useCharacterSymbol } from "@/entities/character";
import { LoadingCard } from "@/shared/ui/LoadingCard";

interface SymbolTabProps {
  ocid: string;
}

export const SymbolTab = ({ ocid }: SymbolTabProps) => {
  const { data, isLoading, isError, error } = useCharacterSymbol(ocid);

  if (isLoading) return <LoadingCard message="심볼 정보 불러오는중..." />;

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  if (
    !data ||
    (data.arcane_symbol.length === 0 && data.authentic_symbol.length === 0)
  )
    return (
      <section className="rounded-md border p-3">
        <p className="text-muted-foreground text-sm whitespace-pre-line">
          2025.09.18 API 업데이트 이후 접속 하지 않았거나, 장착한 심볼이
          없습니다.
        </p>
      </section>
    );

  const Section = ({
    title,
    items,
  }: {
    title: string;
    items: {
      symbol_name: string;
      symbol_icon: string;
      symbol_level: number;
      symbol_option: string;
    }[];
  }) => {
    const totalForce = items.reduce((sum, s) => {
      const match = s.symbol_option.match(
        /(아케인포스|어센틱포스)\s*증가\s*([0-9]+)/,
      );
      return sum + (match ? parseInt(match[2], 10) : 0);
    }, 0);

    return (
      <section className="rounded-md border p-3">
        <h3 className="mb-2 flex items-center justify-between">
          <span className="font-bold">{title}</span>
          <span className="text-muted-foreground text-sm">
            {title === "아케인 심볼"
              ? `아케인포스 ${totalForce.toLocaleString()}`
              : `어센틱포스 ${totalForce.toLocaleString()}`}
          </span>
        </h3>

        <ul className="flex flex-col gap-3">
          {items.map((s) => (
            <li
              key={`${title}-${s.symbol_name}`}
              className="flex items-start gap-3 py-1"
            >
              <Image
                src={s.symbol_icon}
                alt={s.symbol_name}
                width={33}
                height={33}
                unoptimized
                className="bg-secondary h-auto w-auto rounded border object-contain p-1"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {s.symbol_name}
                </p>
                <p className="text-xs">Lv. {s.symbol_level}</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  {s.symbol_option}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <div className="flex w-full max-w-[680px] flex-col gap-2">
      <Section title="아케인 심볼" items={data.arcane_symbol ?? []} />
      <Section title="어센틱 심볼" items={data.authentic_symbol ?? []} />
    </div>
  );
};
