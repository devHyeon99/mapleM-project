import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import {
  isJobFilterable,
  RANKING_UI_ITEMS_PER_PAGE,
  rankingColumns,
  type RankingType,
} from "@/entities/ranking";

const ROWS = Array.from({ length: RANKING_UI_ITEMS_PER_PAGE });

/** 셀렉트 개수가 실제 필터와 어긋나면 로딩이 끝날 때 줄이 밀리므로 직업 셀렉트 유무를 같이 봄 */
function RankingFiltersSkeleton({ type }: { type: RankingType }) {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-2 md:flex-row">
      <div className="flex w-full flex-row gap-2 md:w-auto">
        <Skeleton className="h-8 flex-1 md:w-[195px] md:flex-none" />
        {isJobFilterable(type) && (
          <Skeleton className="h-8 flex-1 md:w-[195px] md:flex-none" />
        )}
      </div>
      <Skeleton className="h-5 w-50 self-end" />
    </div>
  );
}

/** 컬럼 폭은 실제 표와 같은 정의에서 가져옴. 손으로 복제하면 종류마다 어긋남 */
function DesktopTableSkeleton({ type }: { type: RankingType }) {
  const columns = rankingColumns(type);

  return (
    <div className="hidden border-b md:block">
      <Table>
        <TableHeader className="bg-muted/80 dark:bg-accent">
          <TableRow>
            {columns.map((col, index) => (
              <TableHead
                key={index}
                className={cn("text-center", col.className)}
              >
                <Skeleton className="mx-auto h-4 w-10" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-card">
          {ROWS.map((_, rowIndex) => (
            <TableRow key={rowIndex} className="h-12.5">
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={cn("text-center", col.className)}
                >
                  <Skeleton className="mx-auto h-4 w-4/5" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/** 모바일 행은 [순위] [이름·직업·길드 / 값] 두 줄이라 그 골격에 맞춤 */
function MobileListSkeleton() {
  return (
    <ul className="bg-background flex flex-col divide-y border-b md:hidden">
      <li
        aria-hidden="true"
        className="bg-secondary flex h-10 items-center gap-4 p-2"
      >
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-8" />
      </li>
      {ROWS.map((_, index) => (
        <li key={index} className="bg-card flex items-center gap-4 p-2">
          <Skeleton className="h-5 w-8 shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-32" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function RankingPaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-9 rounded-md" />
      ))}
    </div>
  );
}

/** 필터·페이지네이션은 그대로 두고 표만 로딩으로 바꿀 때 씀 */
export function RankingRowsSkeleton({ type }: { type: RankingType }) {
  return (
    <div aria-busy="true" aria-label="랭킹 정보를 불러오는 중">
      <DesktopTableSkeleton type={type} />
      <MobileListSkeleton />
    </div>
  );
}

export function RankingBoardSkeleton({ type }: { type: RankingType }) {
  return (
    <div
      aria-busy="true"
      aria-label="랭킹 정보를 불러오는 중"
      className="flex w-full flex-col gap-4"
    >
      <RankingFiltersSkeleton type={type} />
      <DesktopTableSkeleton type={type} />
      <MobileListSkeleton />
      <RankingPaginationSkeleton />
    </div>
  );
}
