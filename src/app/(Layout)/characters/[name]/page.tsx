import { Suspense } from "react";
import type { Metadata } from "next";
import CharactersClientPage from "./CharactersClientPage";

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

  return {
    title: `${decodedName} - 전체 월드 캐릭터 검색 결과`,
    description: `메이플스토리M "${decodedName}" 전체 월드 캐릭터 검색 결과를 확인하세요.`,
    alternates: {
      canonical: `/characters/${encodeURIComponent(decodedName)}`,
    },
    openGraph: {
      title: `${decodedName} - 전체 월드 캐릭터 캐릭터 검색`,
      description: `메이플스토리M "${decodedName}" 전체 월드 캐릭터 검색 결과를 확인하세요.`,
      images: ["/og-image.png"],
    },
  };
}
export default function CharactersNamePage() {
  return (
    <Suspense>
      <CharactersClientPage />
    </Suspense>
  );
}
