import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGE_SIZE } from "@/shared/config/site";
import { GuildSearch } from "@/features/guild-search";
import { GuildPromotionSection } from "./_lib/GuildPromotionSection";
import { SharenianGuildBoard } from "./_lib/SharenianGuildBoard";

export const metadata: Metadata = {
  title: "메이플스토리M 길드 검색",
  description:
    "메엠지지 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",

  alternates: {
    canonical: "/guild",
  },

  openGraph: {
    title: "메이플스토리M 길드 검색 - 메엠지지",
    description:
      "메엠지지에서 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",
    url: "/guild",
    images: [
      {
        url: OG_IMAGE,
        ...OG_IMAGE_SIZE,
        alt: "메엠지지 길드 검색",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "메이플스토리M 길드 검색 - 메엠지지",
    description:
      "메엠지지에서 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",
    images: [OG_IMAGE],
  },
};

export default async function GuildPage() {
  return (
    <div className="wide:px-0 mb-6 flex flex-col items-center px-4">
      <div className="flex h-65 w-full flex-col items-center justify-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-semibold drop-shadow-md md:text-4xl">
            길드 검색
          </h1>
          <p className="max-w-2xl text-base font-medium text-balance drop-shadow-sm sm:text-lg">
            길드 검색과 모집중인 길드를 찾아보세요.
          </p>
        </div>

        {/* 검색 */}
        <search className="w-full max-w-3xl" aria-label="길드 검색">
          <GuildSearch />
        </search>
      </div>

      <GuildPromotionSection />

      <SharenianGuildBoard />
    </div>
  );
}
