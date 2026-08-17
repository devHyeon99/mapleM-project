import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { CharacterSearch } from "@/features/character-search";
import { CharacterDetail } from "@/widgets/character-detail";
import { fetchOcid, fetchCharacterDetail } from "@/entities/character/server";
import { safeDecode } from "@/shared/lib/url";
import { worldFromSlug } from "@/shared/config/constants/worlds";
import { OG_IMAGE, OG_IMAGE_SIZE } from "@/shared/config/site";
import { NotFoundMetadata } from "./not-found";

interface CharacterPageProps {
  params: Promise<{ world: string; name: string }>;
}

const getPageData = cache(async (world: string, name: string) => {
  const ocidData = await fetchOcid(world, name);
  if (!ocidData?.ocid) return null;

  const characterData = await fetchCharacterDetail(ocidData.ocid);
  if (!characterData) return null;

  return { ocid: ocidData.ocid, characterData };
});

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { world, name } = await params;
  const decodedWorld = worldFromSlug(safeDecode(world));
  const decodedName = safeDecode(name);

  const pageData = await getPageData(decodedWorld, decodedName);
  if (!pageData) return NotFoundMetadata;

  const title = `${decodedName} (${decodedWorld}) - 캐릭터 정보`;
  const description = `${decodedWorld} 서버 ${decodedName} 캐릭터의 상세 정보를 확인하세요.`;

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

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { world, name } = await params;
  const decodedWorld = worldFromSlug(safeDecode(world));
  const decodedName = safeDecode(name);

  const pageData = await getPageData(decodedWorld, decodedName);
  if (!pageData) notFound();

  const { ocid, characterData } = pageData;

  return (
    <div className="wide:px-0 flex w-full flex-1 flex-col items-center px-4 py-6">
      <h1 className="sr-only">
        {decodedName} ({decodedWorld}) 캐릭터 검색 결과
      </h1>

      <search className="mb-2 w-full max-w-3xl" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>

      <CharacterDetail ocid={ocid} characterData={characterData} />
    </div>
  );
}
