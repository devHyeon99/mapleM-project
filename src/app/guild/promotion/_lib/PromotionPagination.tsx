import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/shared/ui/pagination";
import { promotionHref, type PromotionQuery } from "./params";

/**
 * 홍보는 캐시에 최대 60건만 담겨 페이지가 몇 장 안 됨.
 * 그래서 랭킹처럼 그룹 점프(<< >>)를 두지 않고 번호를 전부 그림
 */
export function PromotionPagination({
  query,
  page,
  totalPages,
}: {
  query: PromotionQuery;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (next: number) => promotionHref({ ...query, page: next });

  return (
    <Pagination aria-label="길드 홍보 페이지네이션">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={href(page - 1)}
            aria-label="이전 페이지로 이동"
            className={cn(page <= 1 && "pointer-events-none opacity-50")}
            tabIndex={page <= 1 ? -1 : 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href={href(number)}
              isActive={number === page}
              className={number === page ? "bg-card" : "hover:bg-accent"}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href={href(page + 1)}
            aria-label="다음 페이지로 이동"
            className={cn(
              page >= totalPages && "pointer-events-none opacity-50",
            )}
            tabIndex={page >= totalPages ? -1 : 0}
          >
            <ChevronRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
