import { CharacterSearch } from "@/features/character-search";
import { NoticeTabs } from "@/widgets/notice-tabs";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">메엠지지</h1>
        <p className="text-muted-foreground text-md lg:text-lg">
          메이플스토리M 캐릭터 검색과 유용한 정보를 확인하세요
        </p>
      </div>
      <CharacterSearch />
      <NoticeTabs />
    </div>
  );
}
