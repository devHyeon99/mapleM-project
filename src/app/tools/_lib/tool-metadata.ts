import type { Metadata } from "next";
import { SITE_NAME } from "@/shared/config/site";

const OG_IMAGE = "/og-image.png";

type ToolMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
};

export function buildToolMetadata({
  title,
  description,
  path,
  keywords,
}: ToolMetadataInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    // 자식이 openGraph 를 선언하면 루트의 openGraph 가 통째로 대체된다.
    // siteName/locale/type 은 상속되지 않으므로 여기서 다시 채운다.
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
