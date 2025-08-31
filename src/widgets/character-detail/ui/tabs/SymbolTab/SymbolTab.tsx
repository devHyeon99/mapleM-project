"use client";

import { useCharacterSymbol } from "@/entities/character";
import { LoadingCard } from "@/shared/ui/LoadingCard";
import { TabMessageSection } from "@/shared/ui/TabMessageSection";
import { SymbolSection } from "./SymbolSection";

interface SymbolTabProps {
  ocid: string;
  level: number;
}

export const SymbolTab = ({ ocid, level }: SymbolTabProps) => {
  const { data, isLoading, isError, error } = useCharacterSymbol(
    ocid,
    Number(level),
  );

  // 레벨 제한 예외 처리
  if (level < 200) {
    return (
      <TabMessageSection message="심볼 시스템은 Lv.200이상 이용 가능합니다." />
    );
  }

  // 로딩 상태
  if (isLoading) return <LoadingCard message="심볼 정보 불러오는중..." />;

  // 에러 상태
  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  // 데이터 없음 예외 처리 (심볼 둘 다 없을 때)
  if (
    !data ||
    (data.arcane_symbol.length === 0 && data.authentic_symbol.length === 0)
  ) {
    return (
      <TabMessageSection
        message={`API 업데이트 이후 접속 기록이 없거나\n장착한 심볼이 없습니다.`}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* 아케인 심볼 섹션 */}
      {data.arcane_symbol.length > 0 && (
        <SymbolSection title="아케인 심볼" items={data.arcane_symbol} />
      )}

      {/* 어센틱 심볼 섹션 */}
      {data.authentic_symbol.length > 0 && (
        <SymbolSection title="어센틱 심볼" items={data.authentic_symbol} />
      )}
    </div>
  );
};
