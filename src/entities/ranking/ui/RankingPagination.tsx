"use client";

import { useState, useEffect } from "react";
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

export function RankingPagination() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // [수정] 반응형 처리를 위한 상태 추가 (기본값 5: 모바일 우선)
  const [pagesPerGroup, setPagesPerGroup] = useState(5);

  const currentPage = Number(searchParams.get("page")) || 1;
  const TOTAL_PAGES = 500;

  // [수정] 화면 크기에 따라 페이지 그룹 개수 변경 (md: 768px 기준)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleResize = () => {
      setPagesPerGroup(mediaQuery.matches ? 10 : 5);
    };

    // 초기 실행
    handleResize();

    // 이벤트 리스너 등록
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // 1. 현재 페이지가 속한 그룹 계산 (반응형 pagesPerGroup 사용)
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  // 2. 현재 그룹의 시작/끝 페이지 계산
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, TOTAL_PAGES);

  // 3. [<<] 이전 그룹의 첫 번째 페이지 계산
  const prevGroupFirstPage = (currentGroup - 2) * pagesPerGroup + 1;

  // 4. [>>] 다음 그룹의 첫 번째 페이지 계산
  const nextGroupFirstPage = currentGroup * pagesPerGroup + 1;

  return (
    <Pagination className="pt-2">
      <PaginationContent>
        {/* [<<] 이전 그룹으로 이동 */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(prevGroupFirstPage)}
            aria-label="Go to previous group"
            size="icon"
            className={
              currentGroup <= 1 ? "pointer-events-none opacity-50" : ""
            }
          >
            <ChevronsLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* [<] 이전 페이지 */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage > 1 ? currentPage - 1 : 1)}
            aria-disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* [번호] 반응형 그룹 (모바일 5개, 데스크탑 10개) */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i,
        ).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageUrl(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* [>] 다음 페이지 */}
        <PaginationItem>
          <PaginationNext
            href={createPageUrl(
              currentPage < TOTAL_PAGES ? currentPage + 1 : TOTAL_PAGES,
            )}
            aria-disabled={currentPage >= TOTAL_PAGES}
            className={
              currentPage >= TOTAL_PAGES ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {/* [>>] 다음 그룹으로 이동 */}
        <PaginationItem>
          <PaginationLink
            href={createPageUrl(nextGroupFirstPage)}
            aria-label="Go to next group"
            size="icon"
            className={
              nextGroupFirstPage > TOTAL_PAGES
                ? "pointer-events-none opacity-50"
                : ""
            }
          >
            <ChevronsRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
