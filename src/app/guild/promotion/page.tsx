import type { Metadata } from "next";
import { CONTACT_URL } from "@/shared/config/site";
import { Button } from "@/shared/ui/button";
import { GuildPromotionView } from "@/entities/guild-promotion/ui/GuildPromotionView";
import { getGuildPromotions } from "@/entities/guild-promotion/api/get-guild-promotions";
import { attachGuildInfo } from "../_lib/promotion-with-mark";
import { PromotionFilters } from "./_lib/PromotionFilters";
import { PromotionPagination } from "./_lib/PromotionPagination";
import { PAGE_SIZE, readPromotionQuery } from "./_lib/params";

export const metadata: Metadata = {
  title: "메이플스토리M 길드 홍보 게시판",
  description:
    "메이플스토리M 길드원을 모집 중인 길드를 한곳에서 확인하세요. 월드별 길드 모집 공고와 상세 소개를 볼 수 있습니다.",
  alternates: {
    canonical: "/guild/promotion",
  },
  openGraph: {
    title: "메이플스토리M 길드 홍보 게시판 - 메엠지지",
    description: "메이플스토리M 길드원을 모집 중인 길드를 한곳에서 확인하세요.",
    url: "/guild/promotion",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default async function GuildPromotionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [items, query] = await Promise.all([
    getGuildPromotions(),
    searchParams.then(readPromotionQuery),
  ]);

  const filtered = query.world
    ? items.filter((item) => item.world_name === query.world)
    : items;

  // 목록은 최신순으로 내려옴. 오래된순일 때만 뒤집음.
  // 뒤집는 대상이 PROMOTION_MAX(60건)로 이미 잘린 목록이라, 오래된순은 "전체 중
  // 가장 오래된 것"이 아니라 "최근 60건 중 오래된 것"임. 홍보가 그보다 많아지면
  // 정렬을 DB order 로 내려야 함
  const sorted = query.sort === "latest" ? filtered : [...filtered].reverse();

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  // 범위 밖 page 로 들어와도 빈 화면 대신 마지막 페이지를 보여줌
  const page = Math.min(query.page, totalPages);
  // 넥슨 길드 조회는 이 페이지에 그릴 10건에만 붙임. 목록 전체에 붙이면 60번 나감
  const visible = await attachGuildInfo(
    sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  );

  return (
    <div className="wide:px-0 mt-4 flex w-full flex-col items-center gap-4 px-4 pb-6">
      <div className="w-full">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold md:text-3xl">길드 홍보</h1>
            <p className="text-muted-foreground mt-1 text-sm break-keep">
              길드원을 모집 중인 길드 목록입니다.
            </p>
          </div>

          <Button asChild variant="ghost" size="sm" className="shrink-0">
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
              홍보 문의
            </a>
          </Button>
        </div>

        {items.length > 0 && (
          <div className="mb-3">
            <PromotionFilters query={query} />
          </div>
        )}

        {visible.length > 0 ? (
          <div className="flex flex-col gap-4">
            <GuildPromotionView items={visible} variant="board" />
            <PromotionPagination
              query={query}
              page={page}
              totalPages={totalPages}
            />
          </div>
        ) : (
          <div className="border-border/60 rounded-2xl border border-dashed px-4 py-16 text-center">
            <p className="font-medium">
              {query.world
                ? `${query.world} 월드에 등록된 길드 홍보가 없습니다.`
                : "아직 등록된 길드 홍보가 없습니다."}
            </p>
            <p className="text-muted-foreground text-13 mt-1 break-keep">
              길드를 알리고 싶다면 홍보 문의로 길드명과 소개를 보내주세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
