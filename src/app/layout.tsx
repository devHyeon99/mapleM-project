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

export const metadata: Metadata = {
  metadataBase: new URL("https://mmgg.vercel.app/"),

  title: { default: "메엠지지", template: "%s | 메엠지지" },
  description: "메이플스토리M 캐릭터 검색 서비스",

  openGraph: {
    title: "메엠지지 | MMGG 메이플스토리M 캐릭터 검색 서비스",
    description: "실시간 메이플스토리M 캐릭터 정보를 검색하고 분석하세요.",
    url: "https://mmgg.vercel.app/",
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
    shortcut: "/favicon-16x16.png",
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

  alternates: {
    canonical: "https://mmgg.vercel.app/",
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
      <Script
        src="https://openapi.nexon.com/js/analytics.js?app_id=241136"
        strategy="lazyOnload"
      />
      <body className="bg-background relative flex min-h-screen flex-col antialiased">
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
