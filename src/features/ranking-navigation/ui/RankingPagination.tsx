"use client";

import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  isJobFilterable,
  PAGE_PARAM,
  rankingHrefWithQuery,
  readRankingJob,
  type RankingType,
} from "@/entities/ranking";
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

/** << >> 는 뷰포트별로 건너뛰는 폭이 달라 두 벌을 만들어 두고 CSS 로 가림 */
const PAGE_GROUPS = [
  { size: 5, className: "md:hidden" },
  { size: 10, className: "hidden md:block" },
] as const;

const [MOBILE_GROUP, DESKTOP_GROUP] = PAGE_GROUPS;

interface RankingPaginationProps {
  currentPage: number;
  totalPages: number;
  type: RankingType;
  /** 현재 걸린 월드 필터. 없으면 전체 월드. */
  worldName?: string;
}

/** 화살표 네 개(<< < > >>)가 공유하는 껍데기. 비활성일 때 포커스에서도 빠짐 */
function ArrowLink({
  href,
  label,
  disabled,
  children,
}: {
  href: string;
  label: string;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <PaginationLink
      href={href}
      aria-label={label}
      size="icon"
      className={cn(disabled && "pointer-events-none opacity-50")}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </PaginationLink>
  );
}

export function RankingPagination({
  currentPage,
  totalPages,
  type,
  worldName,
}: RankingPaginationProps) {
  const searchParams = useSearchParams();

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // 직업이 걸린 목록은 경로를 1페이지에 세워 둔 채 페이지만 쿼리로 옮긴다.
  // 세그먼트가 그대로라 페이지를 넘겨도 보드가 리마운트되지 않는다.
  const jobFiltered =
    isJobFilterable(type) && readRankingJob(searchParams) !== null;

  const pageUrl = (page: number) => {
    if (!jobFiltered) {
      return rankingHrefWithQuery(type, { worldName, page }, searchParams);
    }

    const params = new URLSearchParams(searchParams);
    if (page <= 1) params.delete(PAGE_PARAM);
    else params.set(PAGE_PARAM, String(page));

    return rankingHrefWithQuery(type, { worldName }, params);
  };

  // 현재 페이지가 속한 그룹의 범위와, 그 앞뒤 그룹으로 건너뛸 페이지
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

  const desktop = group(DESKTOP_GROUP.size);
  const mobile = group(MOBILE_GROUP.size);

  const groupJump = (edge: "prev" | "next") =>
    PAGE_GROUPS.map(({ size, className }) => {
      const g = group(size);
      const isPrev = edge === "prev";
      const disabled = isPrev ? g.isFirst : g.isLast;
      const Icon = isPrev ? ChevronsLeft : ChevronsRight;

      return (
        <PaginationItem key={`${edge}-group-${size}`} className={className}>
          <ArrowLink
            href={pageUrl(isPrev ? g.prevPage : g.nextPage)}
            label={`${isPrev ? "이전" : "다음"} ${size}페이지로 이동`}
            disabled={disabled}
          >
            <Icon className="h-4 w-4" />
          </ArrowLink>
        </PaginationItem>
      );
    });

  return (
    // nav 태그 역할을 하는 Pagination 컴포넌트에 한글 레이블 추가
    <Pagination aria-label="랭킹 페이지네이션">
      <PaginationContent>
        {groupJump("prev")}

        <PaginationItem>
          <ArrowLink
            href={pageUrl(safeCurrentPage - 1)}
            label="이전 페이지로 이동"
            disabled={safeCurrentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </ArrowLink>
        </PaginationItem>

        {/* 번호는 데스크탑 그룹만큼 만들고, 모바일 그룹 밖은 CSS 로 가림 */}
        {Array.from(
          { length: desktop.end - desktop.start + 1 },
          (_, i) => desktop.start + i,
        ).map((page) => {
          const isVisibleOnMobile = page >= mobile.start && page <= mobile.end;
          const isCurrent = page === safeCurrentPage;

          return (
            <PaginationItem
              key={page}
              className={cn(!isVisibleOnMobile && "hidden md:block")}
            >
              <PaginationLink
                href={pageUrl(page)}
                isActive={isCurrent}
                aria-current={isCurrent ? "page" : undefined}
                className={isCurrent ? "bg-card" : "hover:bg-accent"}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <ArrowLink
            href={pageUrl(safeCurrentPage + 1)}
            label="다음 페이지로 이동"
            disabled={safeCurrentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </ArrowLink>
        </PaginationItem>

        {groupJump("next")}
      </PaginationContent>
    </Pagination>
  );
}
