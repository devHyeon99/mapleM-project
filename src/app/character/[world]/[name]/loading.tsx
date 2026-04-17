import { CharacterSearch } from "@/features/character-search";
import { CharacterDetailSkeleton } from "@/widgets/character-detail";

export default function CharacterLoading() {
  return (
    <div className="flex w-full flex-1 flex-col items-center pt-2 pb-6">
      <search className="mb-4 w-full max-w-3xl px-4" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>

      <CharacterDetailSkeleton />
    </div>
  );
}
