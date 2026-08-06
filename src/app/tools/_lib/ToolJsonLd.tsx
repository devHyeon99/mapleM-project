import { SITE_NAME, SITE_URL } from "@/shared/config/site";

type ToolJsonLdProps = {
  name: string;
  description: string;
  path: string;
};

/**
 * 도구 4개가 같은 스키마 구조를 쓰므로 한 곳에서 생성함.
 * /tools 는 허브가 아니라 세트옵션 계산기 자신이라 빵부스러기는 홈 → 도구 2단계임
 */
export function ToolJsonLd({ name, description, path }: ToolJsonLdProps) {
  const url = `${SITE_URL}${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name,
        url,
        description,
        applicationCategory: "GameApplication",
        operatingSystem: "All",
        inLanguage: "ko-KR",
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
        },
        // 무료 도구임을 밝히지 않으면 유료 앱으로 추정될 수 있음
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "KRW",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
