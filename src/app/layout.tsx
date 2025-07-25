import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

import { Providers } from "@/components/providers/Providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MswProvider } from "@/components/providers/MswProvider";
import { MockSessionProvider } from "@/components/providers/MockSessionProvider";

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
  metadataBase: new URL("https://maplemgg.com"),

  title: {
    default: "메엠지지 - 메이플스토리M 캐릭터 조회",
    template: "%s | 메엠지지",
  },
  description: "메이플스토리M 캐릭터 검색 서비스",

  keywords: [
    "메이플스토리M",
    "메M",
    "메엠지지",
    "MMGG",
    "캐릭터 검색",
    "전적 검색",
    "캐릭터 정보",
    "메이플M",
    "메엠 캐릭터 검색",
    "메이플스토리M 캐릭터 검색",
    "모바일 메이플",
    "모바일 메이플 캐릭터 검색",
  ],

  openGraph: {
    title: "메엠지지 | MMGG 메이플스토리M 캐릭터 검색 서비스",
    description: "실시간 메이플스토리M 캐릭터 정보를 검색하고 분석하세요.",
    url: "https://maplemgg.com",
    siteName: "메엠지지",
    images: [
      {
        url: "/og-image.png",
        width: 502,
        height: 267,
        alt: "메엠지지 서비스 미리보기 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "메엠지지 | MMGG 메이플스토리M 캐릭터 검색 서비스",
    description: "실시간 메이플스토리M 캐릭터 정보를 검색하고 분석하세요.",
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
    canonical: "https://maplemgg.com",
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
      <body className="bg-background relative flex min-h-screen flex-col antialiased">
        <Script
          src="https://openapi.nexon.com/js/analytics.js?app_id=241136"
          strategy="lazyOnload"
        />
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
      </body>
    </html>
  );
}
