import type { Metadata } from "next";
import { connection } from "next/server";
import { CharacterSearch } from "@/features/character-search";
import { getCombinedNotices } from "@/entities/notice/api/notice";
import { getSiteNotices } from "@/entities/notice/api/site-notice";
import { SiteNoticeList } from "@/entities/notice/ui/SiteNoticeList";
import { NoticeGrid } from "@/widgets/notice-grid/ui/NoticeGrid";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

// 던져진 메시지는 화면에 그대로 렌더된다. 원문 노출은 entities/notice/api 쪽에서
// 이미 막았으므로, 여기서는 Error 가 아닌 값이 올라온 경우만 문구로 대체한다.
const errorMessage = (
  result: PromiseSettledResult<unknown>,
  fallback: string,
): string | null => {
  if (result.status === "fulfilled") return null;
  return result.reason instanceof Error ? result.reason.message : fallback;
};

export default async function Home() {
  // 한쪽이 실패해도 나머지 섹션은 살린다.
  const [noticeResult, siteNoticeResult] = await Promise.allSettled([
    getCombinedNotices(),
    getSiteNotices(),
  ]);

  const noticeError = errorMessage(
    noticeResult,
    "넥슨 공지사항을 불러오지 못했습니다.",
  );
  const siteNoticeError = errorMessage(
    siteNoticeResult,
    "사이트 공지사항을 불러오지 못했습니다.",
  );

  // 공지 로딩이 일시적으로 실패한 경우, 에러 화면 HTML이 ISR 풀 라우트
  // 캐시에 최대 revalidate 기간(10분) 동안 고정되어 복구 후에도 노출되는
  // 문제를 막는다. 이 렌더만 동적으로 처리해 다음 요청에서 재시도되게 한다.
  if (noticeError || siteNoticeError) {
    await connection();
  }

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
        <SiteNoticeList
          items={
            siteNoticeResult.status === "fulfilled" ? siteNoticeResult.value : []
          }
          error={siteNoticeError}
        />
      </section>

      {/* 공지사항 섹션 */}
      <section
        className="wide:px-0 w-full max-w-[1080px] pb-6"
        aria-labelledby="notice-heading"
      >
        <h2 id="notice-heading" className="sr-only">
          메이플스토리M 공지사항 및 주요 소식
        </h2>
        <NoticeGrid
          data={noticeResult.status === "fulfilled" ? noticeResult.value : null}
          error={noticeError}
        />
      </section>
    </div>
  );
}
