import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

import { Providers } from "@/app/providers/Providers";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { MswProvider } from "@/app/providers/MswProvider";
import { MockSessionProvider } from "@/app/providers/MockSessionProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "메엠지지 (MMGG)",
  url: "https://maplemgg.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://maplemgg.com/characters?name={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  // 기본 URL 설정
  metadataBase: new URL("https://maplemgg.com"),

  // 사이트 타이틀
  title: {
    default: "메엠지지 - 메이플스토리M 캐릭터 검색 & 종합 정보",
    template: "%s | 메엠지지",
  },

  // 사이트 설명
  description:
    "메이플스토리M 캐릭터 검색은 메엠지지. 캐릭터 정보 조회, 장비, 스킬, 코디, 공략 등 게임 플레이에 유용한 모든 정보를 확인하세요.",

  // 키워드
  keywords: [
    "메이플스토리M",
    "메이플M",
    "메엠",
    "메엠지지",
    "MMGG",
    "캐릭터 검색",
    "전적 검색",
    "장비 조회",
  ],

  // 오픈 그래프 (SNS 공유)
  openGraph: {
    title: "메엠지지 - 메이플스토리M 캐릭터 검색",
    description: "메이플스토리M 캐릭터 정보, 장비, 코디를 한눈에 확인하세요.",
    siteName: "메엠지지",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메엠지지 미리보기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "메엠지지 - 메이플스토리M 캐릭터 검색",
    description: "메이플스토리M 캐릭터 정보, 장비, 코디를 한눈에 확인하세요.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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

  alternates: {
    canonical: "./",
  },

  verification: {
    google: "ixxZ7vNFuRu8LRZzoPtmWz-Q3btL9xUbaWyLFUceJ6Q",
  },
  other: {
    "naver-site-verification": "b8d1d850b61897bbc8e4e15f20d056b0d838be1f",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background relative flex min-h-screen flex-col tabular-nums antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isDev ? (
            <MswProvider>
              <Providers>
                <MockSessionProvider>{children}</MockSessionProvider>
              </Providers>
            </MswProvider>
          ) : (
            <Providers>{children}</Providers>
          )}
        </ThemeProvider>
        {/* 넥슨 애널리틱스 */}
        <Script
          src="https://openapi.nexon.com/js/analytics.js?app_id=241136"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
