import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/app/providers/Providers";
import { SITE_METADATA_BASE, SITE_NAME } from "@/shared/config/site";

const pretendard = localFont({
  src: "../shared/assets/fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: false,
});

const SHARE_TITLE = `${SITE_NAME} - 메이플스토리M 캐릭터 검색 & 종합 정보`;
const SHARE_DESCRIPTION =
  "메이플스토리M 캐릭터 정보, 랭킹, 게임 정보를 한눈에 확인하세요.";
const OG_IMAGE = "/og-image.png";

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  title: {
    default: SHARE_TITLE,
    template: `%s - ${SITE_NAME}`,
  },
  description:
    "메이플스토리M 캐릭터 검색은 메엠지지. 캐릭터 정보 조회, 장비, 스킬, 코디, 랭킹, 공략 등 게임 플레이에 유용한 모든 정보를 확인하세요.",
  keywords: [
    "메이플스토리M",
    "메이플M",
    "메엠",
    "메엠지지",
    "MMGG",
    "메엠 캐릭터 검색",
    "메엠 가이드",
    "메이플M 가이드",
    "모바일 메이플",
  ],
  // og:url 은 두지 않는다. 루트 메타데이터는 자식 세그먼트로 상속되므로, 모든 페이지가 홈 URL 을 og:url 로 내보내게 됨.
  openGraph: {
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 미리보기`,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SHARE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ixxZ7vNFuRu8LRZzoPtmWz-Q3btL9xUbaWyLFUceJ6Q",
    other: {
      "naver-site-verification": "b8d1d850b61897bbc8e4e15f20d056b0d838be1f",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col font-sans">
        <Providers>{children}</Providers>

        {/* 넥슨 애널리틱스 (프로덕션만) */}
        {isProd && (
          <Script
            src="https://openapi.nexon.com/js/analytics.js?app_id=241136"
            strategy="afterInteractive"
          />
        )}
        <Analytics />
      </body>
    </html>
  );
}
