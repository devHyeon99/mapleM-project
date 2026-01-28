"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const PAGES_PER_GROUP_DESKTOP = 10;
const PAGES_PER_GROUP_MOBILE = 5;

interface RankingPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function RankingPagination({
  currentPage,
  totalPages,
}: RankingPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 안전한 현재 페이지 계산
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // 데스크탑 그룹 계산
  const desktopGroupIndex = Math.ceil(
    safeCurrentPage / PAGES_PER_GROUP_DESKTOP,
  );
  const startPage = (desktopGroupIndex - 1) * PAGES_PER_GROUP_DESKTOP + 1;
  const endPage = Math.min(startPage + PAGES_PER_GROUP_DESKTOP - 1, totalPages);

  // 모바일 그룹 계산
  const mobileGroupIndex = Math.ceil(safeCurrentPage / PAGES_PER_GROUP_MOBILE);
  const mobileStart = (mobileGroupIndex - 1) * PAGES_PER_GROUP_MOBILE + 1;
  const mobileEnd = Math.min(
    mobileStart + PAGES_PER_GROUP_MOBILE - 1,
    totalPages,
  );

  // 이전/다음 그룹 대상 페이지 (안전하게 계산)
  const prevGroupPage = Math.max(1, startPage - PAGES_PER_GROUP_DESKTOP);
  const nextGroupPage = Math.min(
    totalPages,
    startPage + PAGES_PER_GROUP_DESKTOP,
  );

  const isFirstGroup = safeCurrentPage <= PAGES_PER_GROUP_DESKTOP;
  const isLastGroup = endPage >= totalPages;

  return (
    // nav 태그 역할을 하는 Pagination 컴포넌트에 한글 레이블 추가
    <Pagination className="pt-4" aria-label="랭킹 페이지네이션">
      <PaginationContent>
        {/* 이전 그룹 이동 (<<) */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(prevGroupPage)}
            aria-label="이전 10페이지로 이동"
            size="icon"
            className={cn(isFirstGroup && "pointer-events-none opacity-50")}
            tabIndex={isFirstGroup ? -1 : 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* 이전 페이지 (<) */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(safeCurrentPage - 1)}
            aria-label="이전 페이지로 이동"
            className={cn(
              safeCurrentPage <= 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {/* 페이지 번호 렌더링 */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => {
          const isVisibleOnMobile = page >= mobileStart && page <= mobileEnd;
          const isCurrent = page === safeCurrentPage;

          return (
            <PaginationItem
              key={page}
              className={isVisibleOnMobile ? "" : "hidden md:block"}
            >
              <PaginationLink
                href={createPageUrl(page)}
                isActive={isCurrent}
                aria-current={isCurrent ? "page" : undefined}
                className={isCurrent ? "bg-card" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 페이지 (>) */}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(safeCurrentPage + 1)}
            aria-label="다음 페이지로 이동"
            className={cn(
              safeCurrentPage >= totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {/* 다음 그룹 이동 (>>) */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(nextGroupPage)}
            aria-label="다음 10페이지로 이동"
            size="icon"
            className={cn(isLastGroup && "pointer-events-none opacity-50")}
            tabIndex={isLastGroup ? -1 : 0}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
