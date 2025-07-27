import { CharacterSearch } from "@/components/domain/character-search/CharacterSearch";
import { NoticeTabs } from "@/components/home/NoticeTabs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold">MMGG</h1>
        <p className="text-muted-foreground text-md lg:text-lg">
          메이플스토리M 캐릭터 정보 검색 서비스
        </p>
      </div>
      <CharacterSearch />
      <NoticeTabs />
    </div>
  );
}
