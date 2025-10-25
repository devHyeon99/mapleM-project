import type { Metadata } from "next";
import { CharacterSearch } from "@/features/character-search";
import { getCharacterSearchAll } from "@/features/character-search-all";
import { CharactersSearchResult } from "@/widgets/characters-search-result";

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const decodedName = safeDecode(name);

  const title = `${decodedName} - 전체 월드 캐릭터 검색 결과`;
  const description = `메이플스토리M "${decodedName}" 전체 월드 캐릭터 검색 결과를 확인하세요.`;
  const url = `/characters/${encodeURIComponent(decodedName)}`;
  const images = ["/og-image.png"];

  return {
    title: title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function CharactersPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = safeDecode(name);

  const characters = await getCharacterSearchAll(decodedName);

  return (
    <div className="flex w-full flex-col items-center">
      <search className="w-full max-w-3xl px-4 pt-2 md:px-0">
        <CharacterSearch />
      </search>

      <CharactersSearchResult name={decodedName} characters={characters} />
    </div>
  );
}
