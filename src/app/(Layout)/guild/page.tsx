import type { Metadata } from "next";
import { GuildSearch } from "@/features/guild-search/ui/GuildSearch";

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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메엠지지 길드 검색",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "메이플스토리M 길드 검색 - 메엠지지",
    description:
      "메엠지지에서 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",
    images: ["/og-image.png"],
  },
};

export default async function GuildPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold md:text-4xl">길드 검색</h1>
        <p
          className="text-foreground max-w-3xl text-base text-balance sm:text-lg"
          data-nosnippet
        >
          메이플스토리M의 길드 데이터는 평균 15분 후 확인 가능합니다.
        </p>
      </div>
      <div className="sr-only">
        <h2>메이플스토리M 길드 정보 조회 서비스</h2>
        <p>
          메엠지지에서 스카니아, 루나, 엘리시움 등 전 서버의 길드 정보를
          검색하세요. 해당 길드의 정보와 길드원, 길드 스킬 및 어빌리티 정보를
          상세하게 확인할 수 있습니다.
        </p>
      </div>

      <div className="w-full max-w-3xl">
        <GuildSearch />
      </div>
    </div>
  );
}
