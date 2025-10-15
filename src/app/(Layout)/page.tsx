import Image from "next/image";
import { CharacterSearch } from "@/features/character-search";
import { getCombinedNotices } from "@/entities/notice/api/notice";
import { NoticeGrid } from "@/widgets/notice-grid/ui/NoticeGrid";

export default async function Home() {
  const noticeData = await getCombinedNotices();

  return (
    <div className="flex flex-col items-center gap-4">
      <section className="wide:px-0 relative flex h-[300px] w-full max-w-[1080px] flex-col items-center justify-center overflow-hidden rounded-none px-4 md:mx-0 md:rounded-xs xl:w-full">
        <Image
          src="/images/main-bg.jpg"
          alt="메이플스토리M 배경"
          fill
          sizes="(max-width: 1080px) 100vw, 1080px"
          className="min-w-[1080px]! object-cover object-left-top"
          priority
        />

        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]/50" />

        {/* 컨텐츠 영역 */}
        <div className="relative z-10 flex w-full flex-col items-center gap-6 text-center text-white">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-semibold drop-shadow-md md:text-4xl">
              메엠지지
            </h1>
            <p className="max-w-2xl text-base font-medium text-balance drop-shadow-sm sm:text-lg">
              메이플스토리M 캐릭터 검색 서비스를 제공합니다.
            </p>
          </div>

          {/* 검색 */}
          <search className="w-full max-w-xl">
            <CharacterSearch variant="glass" />
          </search>
        </div>
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
