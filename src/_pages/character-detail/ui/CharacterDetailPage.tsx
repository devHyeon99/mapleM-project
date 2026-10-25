import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { CharacterDetail } from "./CharacterDetail";
import {
  fetchOcid,
  fetchCharacterDetail,
} from "@/entities/character/index.server";
import { resolveRankingDate } from "@/entities/ranking/index.server";
import { safeDecode } from "@/shared/lib/url";
import { worldFromSlug } from "@/shared/config/constants/worlds";
import { OG_IMAGE, OG_IMAGE_SIZE } from "@/shared/config/site";

// 중첩 not-found.tsx 의 metadata export 는 적용되지 않아 여기서 반환함
const NOT_FOUND_METADATA: Metadata = {
  title: "캐릭터를 찾을 수 없음",
  description: "요청하신 캐릭터 정보를 찾을 수 없습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

interface CharacterPageProps {
  params: Promise<{ world: string; name: string }>;
}

const getPageData = cache(async (world: string, name: string) => {
  const ocidData = await fetchOcid(world, name);
  if (!ocidData?.ocid) return null;

  const characterData = await fetchCharacterDetail(
    ocidData.ocid,
    resolveRankingDate(),
  );
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
  if (!pageData) return NOT_FOUND_METADATA;

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

export async function CharacterDetailPage({ params }: CharacterPageProps) {
  const { world, name } = await params;
  const decodedWorld = worldFromSlug(safeDecode(world));
  const decodedName = safeDecode(name);

  const pageData = await getPageData(decodedWorld, decodedName);
  if (!pageData) notFound();

  const { ocid, characterData } = pageData;

  return (
    <>
      <h1 className="sr-only">
        {decodedName} ({decodedWorld}) 캐릭터 검색 결과
      </h1>

      <CharacterDetail ocid={ocid} characterData={characterData} />
    </>
  );
}
