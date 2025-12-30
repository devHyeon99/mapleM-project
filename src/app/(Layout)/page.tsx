import { CharacterSearch } from "@/features/character-search";
import { getCombinedNotices } from "@/entities/notice/api/notice";
import { getSiteNotices } from "@/entities/notice/api/site-notice";
import { SiteNoticeList } from "@/entities/notice/ui/SiteNoticeList";
import { NoticeGrid } from "@/widgets/notice-grid/ui/NoticeGrid";
import type { SiteNoticeItem } from "@/entities/notice/model/types";

export default async function Home() {
  const [noticeData, siteNoticeResult] = await Promise.all([
    getCombinedNotices(),
    getSiteNotices()
      .then((items) => ({ items, error: null as string | null }))
      .catch((error: unknown) => ({
        items: [] as SiteNoticeItem[],
        error:
          error instanceof Error
            ? error.message
            : "사이트 공지사항을 불러오지 못했습니다.",
      })),
  ]);

  return (
    <div className="flex flex-col items-center">
      {/* 컨텐츠 영역 */}
      <div className="flex h-65 w-full flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold drop-shadow-md md:text-4xl">
            메엠지지
          </h1>
          <p className="max-w-2xl text-base font-medium text-balance drop-shadow-sm sm:text-lg">
            메이플스토리M 캐릭터 검색 서비스를 제공합니다.
          </p>
        </div>

        {/* 검색 */}
        <search className="w-full max-w-3xl px-4">
          <CharacterSearch />
        </search>
      </div>

      <section
        className="wide:px-0 w-full max-w-[1080px] pb-2"
        aria-labelledby="site-notice-heading"
      >
        <h2 id="site-notice-heading" className="sr-only">
          사이트 공지사항
        </h2>
        {siteNoticeResult.error ? (
          <p className="text-muted-foreground text-sm">
            사이트 공지사항을 불러오는 중 오류가 발생했습니다.
          </p>
        ) : (
          <SiteNoticeList items={siteNoticeResult.items} />
        )}
      </section>

      {/* 공지사항 섹션 */}
      <section
        className="wide:px-0 w-full max-w-[1080px] pb-6"
        aria-labelledby="notice-heading"
      >
        <h2 id="notice-heading" className="sr-only">
          메이플스토리M 공지사항 및 주요 소식
        </h2>
        <NoticeGrid data={noticeData} />
      </section>
    </div>
  );
}
