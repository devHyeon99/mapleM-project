"use client";

import { useCharacterSymbol } from "@/entities/character";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { SymbolSection } from "./SymbolSection";
import { TabLoadingBox } from "../../TabLoadingBox";

interface SymbolTabProps {
  ocid: string;
  level: number;
}

export const SymbolTab = ({ ocid, level }: SymbolTabProps) => {
  const { data, isLoading, isError, error } = useCharacterSymbol(
    ocid,
    Number(level),
  );
  const arcaneSymbols = Array.isArray(data?.arcane_symbol)
    ? data.arcane_symbol
    : [];
  const authenticSymbols = Array.isArray(data?.authentic_symbol)
    ? data.authentic_symbol
    : [];

  // 레벨 제한 예외 처리
  if (level < 200) {
    return (
      <TabMessageSection message="심볼 시스템은 Lv.200 이상 이용 가능합니다." />
    );
  }

  // 로딩 상태
  if (isLoading)
    return <TabLoadingBox className="min-h-[886px] md:min-h-[609px]" />;

  // 에러 상태
  if (isError) return <TabMessageSection error={error} />;

  // 데이터 없음 예외 처리 (심볼 둘 다 없을 때)
  if (!data || (arcaneSymbols.length === 0 && authenticSymbols.length === 0)) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 심볼이 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between">
      {/* 아케인 심볼 섹션 */}
      {arcaneSymbols.length > 0 && (
        <SymbolSection title="아케인 심볼" items={arcaneSymbols} />
      )}

      {/* 어센틱 심볼 섹션 */}
      {authenticSymbols.length > 0 && (
        <SymbolSection title="어센틱 심볼" items={authenticSymbols} />
      )}
    </div>
  );
};
