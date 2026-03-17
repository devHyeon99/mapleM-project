"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shared/ui/pagination";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
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

  // 뷰포트별 페이지 그룹 계산 (모바일 5개, 데스크탑 10개)
  const group = (size: number) => {
    const start = (Math.ceil(safeCurrentPage / size) - 1) * size + 1;
    const end = Math.min(start + size - 1, totalPages);
    return {
      start,
      end,
      prevPage: Math.max(1, start - size),
      nextPage: Math.min(totalPages, start + size),
      isFirst: start <= 1,
      isLast: end >= totalPages,
    };
  };

  const desktop = group(PAGES_PER_GROUP_DESKTOP);
  const mobile = group(PAGES_PER_GROUP_MOBILE);

  const arrowClass = (disabled: boolean) =>
    cn(disabled && "pointer-events-none opacity-50");

  return (
    // nav 태그 역할을 하는 Pagination 컴포넌트에 한글 레이블 추가
    <Pagination aria-label="랭킹 페이지네이션">
      <PaginationContent>
        {/* 이전 그룹 이동 (<<) - 모바일 5페이지 / 데스크탑 10페이지 */}
        {[mobile, desktop].map((g, index) => {
          const isMobile = index === 0;
          const size = isMobile
            ? PAGES_PER_GROUP_MOBILE
            : PAGES_PER_GROUP_DESKTOP;

          return (
            <PaginationItem
              key={`prev-group-${size}`}
              className={isMobile ? "md:hidden" : "hidden md:block"}
            >
              <PaginationLink
                href={createPageUrl(g.prevPage)}
                aria-label={`이전 ${size}페이지로 이동`}
                size="icon"
                className={arrowClass(g.isFirst)}
                tabIndex={g.isFirst ? -1 : 0}
              >
                <ChevronsLeft className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 이전 페이지 (<) */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(safeCurrentPage - 1)}
            aria-label="이전 페이지로 이동"
            size="icon"
            className={arrowClass(safeCurrentPage <= 1)}
            tabIndex={safeCurrentPage <= 1 ? -1 : 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* 페이지 번호 렌더링 */}
        {Array.from(
          { length: desktop.end - desktop.start + 1 },
          (_, i) => desktop.start + i,
        ).map((page) => {
          const isVisibleOnMobile = page >= mobile.start && page <= mobile.end;
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
                className={isCurrent ? "bg-card" : "hover:bg-accent"}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 다음 페이지 (>) */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(safeCurrentPage + 1)}
            aria-label="다음 페이지로 이동"
            size="icon"
            className={arrowClass(safeCurrentPage >= totalPages)}
            tabIndex={safeCurrentPage >= totalPages ? -1 : 0}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* 다음 그룹 이동 (>>) - 모바일 5페이지 / 데스크탑 10페이지 */}
        {[mobile, desktop].map((g, index) => {
          const isMobile = index === 0;
          const size = isMobile
            ? PAGES_PER_GROUP_MOBILE
            : PAGES_PER_GROUP_DESKTOP;

          return (
            <PaginationItem
              key={`next-group-${size}`}
              className={isMobile ? "md:hidden" : "hidden md:block"}
            >
              <PaginationLink
                href={createPageUrl(g.nextPage)}
                aria-label={`다음 ${size}페이지로 이동`}
                size="icon"
                className={arrowClass(g.isLast)}
                tabIndex={g.isLast ? -1 : 0}
              >
                <ChevronsRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}
