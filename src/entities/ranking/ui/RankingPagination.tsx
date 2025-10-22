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
const TOTAL_PAGES = 500;

export function RankingPagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // 데스크탑 기준 그룹 계산 (1~10, 11~20)
  const desktopGroupIndex = Math.ceil(currentPage / PAGES_PER_GROUP_DESKTOP);
  const startPage = (desktopGroupIndex - 1) * PAGES_PER_GROUP_DESKTOP + 1;
  const endPage = Math.min(
    startPage + PAGES_PER_GROUP_DESKTOP - 1,
    TOTAL_PAGES,
  );

  // 모바일 뷰포트에서의 표시 범위 계산 (현재 페이지가 포함된 5개 구간)
  const mobileGroupIndex = Math.ceil(currentPage / PAGES_PER_GROUP_MOBILE);
  const mobileStart = (mobileGroupIndex - 1) * PAGES_PER_GROUP_MOBILE + 1;
  const mobileEnd = mobileStart + PAGES_PER_GROUP_MOBILE - 1;

  // 그룹 이동 네비게이션 타겟 계산
  const prevGroupPage = (desktopGroupIndex - 2) * PAGES_PER_GROUP_DESKTOP + 1;
  const nextGroupPage = desktopGroupIndex * PAGES_PER_GROUP_DESKTOP + 1;

  const isFirstGroup = desktopGroupIndex <= 1;
  const isLastGroup = nextGroupPage > TOTAL_PAGES;

  return (
    <Pagination className="pt-4">
      <PaginationContent>
        {/* 이전 그룹 이동 (<<) */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(prevGroupPage)}
            aria-label="Go to previous group"
            size="icon"
            className={cn(isFirstGroup && "pointer-events-none opacity-50")}
            aria-disabled={isFirstGroup}
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* 이전 페이지 (<) */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(Math.max(1, currentPage - 1))}
            className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>

        {/* 페이지 번호 렌더링 */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => {
          // 모바일 범위에 포함되지 않는 페이지는 CSS로 숨김 처리하여 Hydration 이슈 방지
          const isVisibleOnMobile = page >= mobileStart && page <= mobileEnd;

          return (
            <PaginationItem
              key={page}
              className={isVisibleOnMobile ? "" : "hidden md:block"}
            >
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 페이지 (>) */}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(Math.min(TOTAL_PAGES, currentPage + 1))}
            className={cn(
              currentPage >= TOTAL_PAGES && "pointer-events-none opacity-50",
            )}
            aria-disabled={currentPage >= TOTAL_PAGES}
          />
        </PaginationItem>

        {/* 다음 그룹 이동 (>>) */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(nextGroupPage)}
            aria-label="Go to next group"
            size="icon"
            className={cn(isLastGroup && "pointer-events-none opacity-50")}
            aria-disabled={isLastGroup}
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
