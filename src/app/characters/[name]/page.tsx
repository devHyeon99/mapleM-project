import type { Metadata } from "next";
import { Suspense } from "react";
import { CharacterSearch } from "@/features/character-search";
import { getCharacterSearchAll } from "@/features/character-search/server";
import {
  CharactersSearchResult,
  CharactersSearchResultSkeleton,
} from "@/widgets/characters-search-result";
import { safeDecode } from "@/shared/lib/url";
import { OG_IMAGE, OG_IMAGE_SIZE } from "@/shared/config/site";

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
      images: [{ url: OG_IMAGE, ...OG_IMAGE_SIZE }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
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
    <div className="wide:px-0 flex w-full flex-col items-center px-4 py-6">
      <search className="w-full max-w-3xl" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>

      <h1 className="sr-only">
        전체 월드 내 &quot;{decodedName}&quot; 검색 결과
      </h1>

      <Suspense
        fallback={<CharactersSearchResultSkeleton name={decodedName} />}
      >
        <CharactersResultSection name={decodedName} />
      </Suspense>
    </div>
  );
}

async function CharactersResultSection({ name }: { name: string }) {
  const { characters, failedWorlds } = await getCharacterSearchAll(name);

  return (
    <CharactersSearchResult
      name={name}
      characters={characters}
      failedWorlds={failedWorlds}
    />
  );
}
