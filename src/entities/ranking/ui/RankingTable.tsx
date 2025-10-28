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
import { RANKING_COLUMNS, RankingTableContext } from "./ranking-table.config";
import type { RankingType, AnyRankingData } from "../model/types/ranking";
import { MobileRankingList } from "./MobileRankingList";

interface RankingTableProps {
  type: RankingType;
  data: AnyRankingData[];
  currentPage: number;
  worldName?: string;
  className?: string;
}

export const RankingTable = ({
  type,
  data,
  currentPage,
  worldName,
  className,
}: RankingTableProps) => {
  const items = useMemo(() => {
    if (!data || data.length === 0) return [];
    const relativePageIndex = (currentPage - 1) % 10;
    const startIndex = relativePageIndex * 20;
    return data.slice(startIndex, startIndex + 20);
  }, [data, currentPage]);

  const columns = useMemo(() => {
    if (type.includes("sharenian")) return RANKING_COLUMNS.sharenian;
    if (type === "union") return RANKING_COLUMNS.union;
    if (type === "achievement") return RANKING_COLUMNS.achievement;
    return RANKING_COLUMNS[type] || RANKING_COLUMNS.level;
  }, [type]);

  const context = useMemo<RankingTableContext>(
    () => ({ isWorldRankingView: !!worldName }),
    [worldName],
  );

  const hasData = items.length > 0;

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
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
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

          <TableBody className="bg-muted/30">
            {hasData ? (
              items.map((item, index) => {
                // Key 생성 로직
                const uniqueKey =
                  ("character_name" in item
                    ? `${item.world_name}-${item.character_name}`
                    : "guild_name" in item
                      ? `${item.world_name}-${item.guild_name}`
                      : `${type}-${index}`) + `-${item.ranking}`;

                return (
                  <TableRow
                    key={uniqueKey}
                    className="hover:bg-muted/50 h-12.5"
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={`${uniqueKey}-col-${colIndex}`}
                        className={cn("text-center", col.className)}
                      >
                        {col.cell(item, context)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground h-24 text-center"
                >
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 모바일 뷰 */}
      <div className="block md:hidden">
        {hasData ? (
          <MobileRankingList type={type} data={items} context={context} />
        ) : (
          <div className="bg-background text-muted-foreground flex h-24 items-center justify-center rounded-md border text-sm">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
