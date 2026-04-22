import { CharacterSearch } from "@/features/character-search";
import { CharacterDetailSkeleton } from "@/widgets/character-detail";

export default function CharacterLoading() {
  return (
    <div className="wide:px-0 flex w-full flex-1 flex-col items-center px-4 py-6">
      <search className="mb-2 w-full max-w-3xl" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>

      <CharacterDetailSkeleton />
    </div>
  );
}
