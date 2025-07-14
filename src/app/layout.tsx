import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Provider 컴포넌트들을 import
import { Providers } from "@/components/providers/Providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MswProvider } from "@/components/providers/MswProvider";
import { MockSessionProvider } from "@/components/providers/MockSessionProvider";

// 로컬 폰트 설정 (유지)
const pretendard = localFont({
  src: "../../public/fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

// 💡 SEO 최적화된 Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://mmgg.vercel.app/"),

  title: { default: "메엠지지", template: "%s | 메엠지지" },
  description: "메이플스토리M 캐릭터 검색 서비스",

  openGraph: {
    title: "메엠지지 | MMGG 메이플스토리M 캐릭터 검색 서비스",
    description: "실시간 메이플스토리M 캐릭터 정보를 검색하고 분석하세요.",
    url: "https://mmgg.vercel.app/", // ⚠️ 실제 도메인으로 변경 필수
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

  // 2. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "메엠지지 | MMGG 메이플스토리M 캐릭터 검색 서비스",
    description: "실시간 메이플스토리M 캐릭터 정보를 검색하고 분석하세요.",
    images: ["/og-image.png"], // Twitter 카드용 이미지
  },

  // 3. 아이콘 및 매니페스트
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // 4. 로봇 설정 (크롤링 허용)
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

  // 5. 캐노니컬 URL
  alternates: {
    canonical: "https://mmgg.vercel.app/", // ⚠️ 실제 도메인으로 변경 필수
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 💡 성능 최적화: 개발 환경 여부를 확인하여 MSW/Mock Session Provider 조건부 렌더링
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body className="bg-background relative flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ⚠️ 개발 환경(Dev)에서만 MSW와 Mock Session을 로드하여 프로덕션 성능 저하 방지 */}
          {isDev ? (
            <MswProvider>
              <Providers>
                <MockSessionProvider>{children}</MockSessionProvider>
              </Providers>
            </MswProvider>
          ) : (
            // 프로덕션 환경(Prod)에서는 핵심 Provider만 사용
            <Providers>{children}</Providers>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
