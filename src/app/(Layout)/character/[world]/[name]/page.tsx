import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CharacterSearch } from "@/features/character-search";
import { CharacterDetail } from "@/widgets/character-detail";
import { fetchOcid } from "@/entities/character/api/server/ocid.server";
import { fetchCharacterDetail } from "@/entities/character/api/server/detail.server";
import { safeDecode } from "@/shared/lib/url";

interface CharacterPageProps {
  params: Promise<{ world: string; name: string }>;
}

async function getPageData(world: string, name: string) {
  const ocidData = await fetchOcid(world, name);
  if (!ocidData?.ocid) return null;

  const characterData = await fetchCharacterDetail(ocidData.ocid);
  if (!characterData) return null;

  return { ocid: ocidData.ocid, characterData };
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { world, name } = await params;
  const decodedWorld = safeDecode(world);
  const decodedName = safeDecode(name);
  const title = `${decodedName} (${decodedWorld}) - 캐릭터 정보`;
  const description = `${decodedWorld} 서버 ${decodedName} 캐릭터의 상세 정보를 확인하세요.`;

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

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { world, name } = await params;
  const decodedWorld = safeDecode(world);
  const decodedName = safeDecode(name);

  const pageData = await getPageData(decodedWorld, decodedName);
  if (!pageData) notFound();

  const { ocid, characterData } = pageData;

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center pt-2 pb-6">
      <search className="mb-4 w-full max-w-3xl px-4" aria-label="캐릭터 재검색">
        <CharacterSearch />
      </search>
      <h1 className="sr-only">
        {decodedName} ({decodedWorld}) 캐릭터 검색 결과
      </h1>

      <CharacterDetail ocid={ocid} characterData={characterData} />
    </div>
  );
}
