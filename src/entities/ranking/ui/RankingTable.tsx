"use client";

import { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { cn } from "@/shared/lib/utils";
import { useRecentSearch } from "@/shared/lib/hooks/useRecentSearch";
import { rankingColumns } from "./ranking-table.columns";
import {
  HIGHLIGHT_ROW_CLASS,
  isHighlightedRow,
  rankingItemKey,
  type RankingTableContext,
} from "./ranking-table.renderers";
import type {
  AnyRankingData,
  RankingHighlight,
  RankingType,
} from "../model/types/ranking";
import { MobileRankingList } from "./MobileRankingList";

interface RankingTableProps {
  type: RankingType;
  data: AnyRankingData[];
  currentPage: number;
  worldName?: string;
  highlight?: RankingHighlight | null;
  className?: string;
}

export const RankingTable = ({
  type,
  data,
  currentPage,
  worldName,
  highlight,
  className,
}: RankingTableProps) => {
  const { addHistory } = useRecentSearch("character-search-history");

  const items = useMemo(() => {
    if (!data || data.length === 0) return [];
    const relativePageIndex = (currentPage - 1) % 10;
    const startIndex = relativePageIndex * 20;
    return data.slice(startIndex, startIndex + 20);
  }, [data, currentPage]);

  const columns = useMemo(() => rankingColumns(type), [type]);

  const context = useMemo<RankingTableContext>(
    () => ({
      addCharacterHistory: addHistory,
      isWorldRankingView: !!worldName,
      highlight,
    }),
    [addHistory, worldName, highlight],
  );

  return (
    // 논리적 섹션 구분과 제목 추가 (SEO/접근성)
    <div className={className}>
      {/* 데스크탑 뷰 */}
      <div className="hidden border-b md:block">
        {/* 표의 목적을 명시하는 caption 추가 */}
        <Table>
          <caption className="sr-only">
            {worldName || "전체"} 월드 {type} 랭킹 정보 테이블
          </caption>
          <TableHeader className="bg-muted/80 dark:bg-accent">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead
                  key={`${col.header}-${idx}`}
                  scope="col" // 접근성: 헤더임을 명시
                  className={cn("text-center", col.className)}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-card">
            {items.map((item) => {
              const key = rankingItemKey(item);

              return (
                <TableRow
                  key={key}
                  className={cn(
                    "hover:bg-accent/30 dark:hover:bg-accent/50 h-12.5",
                    isHighlightedRow(item, context) && HIGHLIGHT_ROW_CLASS,
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={`${key}-col-${colIndex}`}
                      className={cn(
                        "text-center",
                        col.className,
                        col.cellClassName,
                      )}
                    >
                      {col.cell(item, context)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* 모바일 뷰 */}
      <div className="block md:hidden">
        <MobileRankingList type={type} data={items} context={context} />
      </div>
    </div>
  );
};
