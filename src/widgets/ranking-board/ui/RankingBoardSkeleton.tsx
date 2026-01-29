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
import { RANKING_UI_ITEMS_PER_PAGE } from "@/entities/ranking/model/constants";

const COLUMN_WIDTHS = [
  "w-[60px]",
  "w-[80px]",
  "w-[150px]",
  "w-[120px]",
  "w-[120px]",
  "w-[120px]",
];

function RankingFiltersSkeleton() {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-between gap-2 px-4 py-4 md:flex-row md:px-0">
      <Skeleton className="h-10 w-full md:w-[195px]" />
      <Skeleton className="h-5 w-44 self-end" />
    </div>
  );
}

function DesktopTableSkeleton() {
  const rows = Array.from({ length: RANKING_UI_ITEMS_PER_PAGE });

  return (
    <div className="hidden border-b md:block">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {COLUMN_WIDTHS.map((width, index) => (
              <TableHead key={index} className={cn("text-center", width)}>
                <Skeleton className="mx-auto h-4 w-10" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-card">
          {rows.map((_, rowIndex) => (
            <TableRow key={rowIndex} className="h-12.5">
              {COLUMN_WIDTHS.map((width, colIndex) => (
                <TableCell key={colIndex} className={cn("text-center", width)}>
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

function MobileListSkeleton() {
  const rows = Array.from({ length: RANKING_UI_ITEMS_PER_PAGE });

  return (
    <ul className="bg-background flex flex-col divide-y border-b md:hidden">
      <li
        aria-hidden="true"
        className="bg-secondary flex h-10 items-center gap-4 px-3 py-2"
      >
        <Skeleton className="h-4 w-8" />
        <Skeleton className="h-4 w-8" />
      </li>
      {rows.map((_, index) => (
        <li
          key={index}
          className="bg-card flex items-center justify-between p-3"
        >
          <div className="flex min-w-0 items-center gap-4">
            <Skeleton className="h-5 w-6 shrink-0" />
            <div className="flex min-w-0 flex-col gap-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-4 w-12 shrink-0" />
        </li>
      ))}
    </ul>
  );
}

function RankingPaginationSkeleton() {
  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} className="h-9 w-9 rounded-md" />
      ))}
    </div>
  );
}

export function RankingBoardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="랭킹 정보를 불러오는 중"
      className="flex w-full flex-col"
    >
      <RankingFiltersSkeleton />
      <DesktopTableSkeleton />
      <MobileListSkeleton />
      <RankingPaginationSkeleton />
    </div>
  );
}
