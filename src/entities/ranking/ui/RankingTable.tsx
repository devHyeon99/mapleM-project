// src/entities/ranking/ui/RankingTable.tsx
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
  // 1. 데이터 슬라이싱 (Server Data 200개 -> UI 20개)
  const items = useMemo(() => {
    if (!data || data.length === 0) return [];
    const relativePageIndex = (currentPage - 1) % 10;
    const startIndex = relativePageIndex * 20;
    return data.slice(startIndex, startIndex + 20);
  }, [data, currentPage]);

  // 2. 컬럼 설정 가져오기 (Desktop용)
  const columns = useMemo(() => {
    if (type.includes("sharenian")) return RANKING_COLUMNS.sharenian;
    if (type === "union") return RANKING_COLUMNS.union;
    if (type === "achievement") return RANKING_COLUMNS.achievement;
    return RANKING_COLUMNS[type] || RANKING_COLUMNS.level;
  }, [type]);

  // 3. 컨텍스트 생성
  const context = useMemo<RankingTableContext>(
    () => ({ isWorldRankingView: !!worldName }),
    [worldName],
  );

  const hasData = items.length > 0;

  return (
    <div className={className}>
      {/* ------------------------------------------------------- */}
      {/* 1. 데스크탑 뷰 (md 이상에서만 보임) : Table              */}
      {/* ------------------------------------------------------- */}
      <div className="hidden border-b md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              {columns.map((col, idx) => (
                <TableHead
                  key={col.header + idx}
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
                let uniqueKey = "";
                if ("character_name" in item) {
                  uniqueKey = `${item.world_name}-${item.character_name}-${item.ranking}`;
                } else if ("guild_name" in item) {
                  uniqueKey = `${item.world_name}-${item.guild_name}-${item.ranking}`;
                } else {
                  // Fallback for safety
                  const fallbackItem = item as { ranking: number };
                  uniqueKey = `${type}-${fallbackItem.ranking}-${index}`;
                }

                return (
                  <TableRow
                    key={uniqueKey}
                    className="hover:bg-muted/50 h-12.5"
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell
                        key={`${uniqueKey}-${colIndex}`}
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

      {/* ------------------------------------------------------- */}
      {/* 2. 모바일 뷰 (md 미만에서만 보임) : MobileRankingList    */}
      {/* ------------------------------------------------------- */}
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
