"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { cn } from "@/shared/lib/utils";
import { getRanking } from "../api/get-ranking";
import { rankingQueryKeys } from "../model/queries/query-keys";
import { adaptRankingItem } from "../lib/ranking-adapter";
import type { RankingType } from "../model/types/ranking";
import { RANKING_COLUMNS, RankingTableContext } from "./ranking-table.config";
import { MobileRankingCard } from "./mobile-ranking-card"; // 위에서 만든 파일 import
interface RankingTableProps {
  type: RankingType;
  filters: {
    worldName?: string;
    date?: string;
    page: number; // UI 페이지 (1~500)
  };
  className?: string;
}

export const RankingTable = ({
  type,
  filters,
  className,
}: RankingTableProps) => {
  // 1. UI Page(1~500)를 API Page(1~50)로 변환
  // UI 1~10페이지 -> API 1페이지
  // UI 11~20페이지 -> API 2페이지
  const apiPage = Math.ceil(filters.page / 10);

  // 2. API 호출
  // apiFilters에는 UI page를 제외하고, 계산된 apiPage를 넣어서 쿼리 키를 만듭니다.
  const { page: uiPage, ...restFilters } = filters;

  const { data, isLoading } = useQuery({
    // apiPage가 1일 때는 UI 페이지 1~10을 왔다갔다 해도 키가 같으므로 캐시된 데이터를 씁니다.
    // apiPage가 2로 바뀌면(UI 11페이지 진입) 그때 새로 요청합니다.
    queryKey: rankingQueryKeys.list(type, { ...restFilters, page: apiPage }),
    queryFn: () => getRanking({ type, ...restFilters, page: apiPage }),
    // [추천] 클라이언트 캐싱 추가
    // 5분 동안은 사용자가 페이지를 왔다 갔다 해도 서버에 요청조차 보내지 않습니다.
    // 서버 캐싱이 있어도 네트워크 왕복 비용을 아끼기 위해 필요합니다.
    staleTime: 1000 * 60 * 5,

    // (선택) 가비지 컬렉션 시간 (기본값 5분)
    // 메모리에서 데이터를 언제 지울지 결정합니다. staleTime보다 길거나 같게 설정합니다.
    gcTime: 1000 * 60 * 10,
  });

  // 3. 200개 데이터 중 현재 UI 페이지에 맞는 20개 잘라내기
  const unifiedItems = useMemo(() => {
    if (!data?.ranking) return [];

    // 현재 API 페이지 내에서의 상대적 인덱스 (0 ~ 9)
    // 예: UI 12페이지 -> (11) % 10 = 1번째 블록
    const relativePageIndex = (uiPage - 1) % 10;

    const startIndex = relativePageIndex * 20;
    const rawItemsSlice = data.ranking.slice(startIndex, startIndex + 20);

    return rawItemsSlice.map((item) => adaptRankingItem(type, item));
  }, [data, uiPage, type]);

  // 4. 컬럼 설정 가져오기 (이전과 동일)
  const columns = useMemo(() => {
    if (type.includes("sharenian")) return RANKING_COLUMNS.sharenian;
    return RANKING_COLUMNS[type] || RANKING_COLUMNS.level;
  }, [type]);

  // 5. 컨텍스트 (이전과 동일)
  const context = useMemo<RankingTableContext>(
    () => ({
      isWorldRankingView: !!filters.worldName,
    }),
    [filters.worldName],
  );

  if (isLoading) console.log("로딩중");

  const mobileStatHeader = useMemo(() => {
    switch (type) {
      case "level":
      case "union":
        return "레벨";
      case "dojang":
      case "kerning-m-tower":
        return "층수";
      case "combat-power":
        return "전투력";
      case "sharenian-battlefield":
      case "sharenian-waterway":
      case "root-of-time":
      case "achievement":
        return "점수";

      default:
        return "수치";
    }
  }, [type]);

  if (!data) return null;
  const hasData = unifiedItems.length > 0;
  return (
    <div className={cn("bg-background rounded-md border", className)}>
      {/* ------------------------------------------------------- */}
      {/* 1. 데스크탑 뷰 (md 이상에서만 보임: hidden md:block)       */}
      {/* ------------------------------------------------------- */}
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {columns.map((col) => (
                <TableHead
                  key={col.header}
                  className={cn("text-center", col.className)}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {hasData ? (
              unifiedItems.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((col) => (
                    <TableCell
                      key={`${item.id}-${col.header}`}
                      className="text-center"
                    >
                      {col.cell(item, context)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
      {/* 2. 모바일 뷰 (md 미만에서만 보임: block md:hidden)        */}
      {/* ------------------------------------------------------- */}
      <div className="block md:hidden">
        {hasData ? (
          <div className="flex flex-col">
            {/* [추가됨] 모바일 리스트 헤더 */}
            <div className="bg-muted/50 text-muted-foreground flex items-center justify-between border-b px-4 py-2 text-xs font-medium">
              <div className="flex items-center gap-4">
                {/* MobileRankingCard의 순위 영역(w-8)과 너비를 맞춰야 정렬이 맞음 */}
                <div className="flex w-8 justify-center">순위</div>
                <div>정보</div>
              </div>
              <div>{mobileStatHeader}</div>
            </div>

            {/* 리스트 목록 */}
            <div className="divide-y">
              {unifiedItems.map((item) => (
                <MobileRankingCard
                  key={item.id}
                  item={item}
                  type={type}
                  isWorldRankingView={context.isWorldRankingView}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
            데이터가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
