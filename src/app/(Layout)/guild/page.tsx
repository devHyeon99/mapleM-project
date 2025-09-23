import type { Metadata } from "next";
import { SearchBar } from "@/features/guild-search/ui/SearchBar";

export const metadata: Metadata = {
  title: "메이플스토리M 길드 검색",
  description:
    "메엠지지 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",
  openGraph: {
    title: "메이플스토리M 길드 검색 | 메엠지지",
    description:
      "메엠지지 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",
    url: "/guild",
  },
  twitter: {
    title: "메이플스토리M 길드 검색 | 메엠지지",
    description:
      "메엠지지 메이플스토리M 길드 검색을 통해 상세한 길드 정보를 확인해보세요.",
  },
};

export default async function GuildPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="my-2 text-2xl font-bold md:text-3xl">길드 검색</h1>
      <p className="text-muted-foreground mb-4 text-sm md:text-base">
        메이플스토리M의 길드 데이터는 평균 15분 후 확인 가능합니다.
      </p>

      <div className="w-full max-w-lg min-w-[320px]">
        <SearchBar />
      </div>
    </div>
  );
}
