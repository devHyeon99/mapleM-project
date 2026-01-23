import type { Metadata } from "next";
import { Suspense } from "react";
import { CharacterSearch } from "@/features/character-search";
import { getCharacterSearchAll } from "@/features/character-search/server";
import { CharactersSearchResult } from "@/widgets/characters-search-result";
import { CharactersSearchResultSkeleton } from "@/widgets/characters-search-result";
import { safeDecode } from "@/shared/lib/url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const decodedName = safeDecode(name);
  const title = `${decodedName} - 캐릭터 검색 결과`;
  const description = `${decodedName} 캐릭터 검색 결과를 확인하세요.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CharactersPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const decodedName = safeDecode(name);

  return (
    <div className="flex w-full flex-col items-center">
      <search className="w-full max-w-3xl px-4 pt-2">
        <CharacterSearch />
      </search>

      <Suspense
        fallback={<CharactersSearchResultSkeleton name={decodedName} />}
      >
        <CharactersResultSection name={decodedName} />
      </Suspense>
    </div>
  );
}

async function CharactersResultSection({ name }: { name: string }) {
  const characters = await getCharacterSearchAll(name);

  return <CharactersSearchResult name={name} characters={characters} />;
}
