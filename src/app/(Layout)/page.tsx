import { CharacterSearch } from "@/components/home/CharacterSearch";

// 새로 만든 HomeBoardTabs 컴포넌트를 import 합니다.
import { NoticeTabs } from "@/components/home/NoticeTabs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold">MMGG</h1>
        <p className="text-muted-foreground text-md lg:text-lg">
          메이플스토리 M의 모든 정보를 한눈에 살펴보세요
        </p>
      </div>
      <CharacterSearch />
      <NoticeTabs />
    </div>
  );
}
