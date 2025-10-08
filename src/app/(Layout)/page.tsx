import { CharacterSearch } from "@/features/character-search";
import { NoticeTabs } from "@/widgets/notice-tabs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-semibold md:text-4xl">메엠지지</h1>
        <p className="text-foreground max-w-3xl text-base text-balance sm:text-lg">
          메이플스토리M 캐릭터 검색 서비스를 제공합니다.
        </p>
      </div>
      <CharacterSearch />
      <NoticeTabs />
    </div>
  );
}
