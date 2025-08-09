import { CharacterSearch } from "@/features/character-search";
import { NoticeTabs } from "@/widgets/notice-tabs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-4xl font-bold">메엠지지</h1>
        <p className="text-muted-foreground text-md lg:text-lg">
          메이플스토리M 캐릭터 정보 검색 서비스
        </p>
      </div>
      <CharacterSearch />
      <NoticeTabs />
    </div>
  );
}
