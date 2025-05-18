import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const pretendard = localFont({
  src: "../../public/fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "MMGG | 메이플스토리M 유저검색, 유저모집, 스케줄러, 가이드 정보 웹 서비스",
    template: "%s | MMGG",
  },
  description:
    "메이플스토리 M 유저를 위한 넥슨 API를 활용한 웹 서비스 페이지 입니다. 유저검색, 유저모집, 스케줄러 관리, 가이드 정보를 제공합니다.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body className="bg-background relative flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 py-8">
            <div className="grid grid-cols-1 gap-8 px-4 lg:mx-auto lg:max-w-[1080px] 2xl:max-w-[1800px] 2xl:grid-cols-[200px_1fr_200px]">
              {/* --- 왼쪽 사이드바 --- */}
              <aside className="hidden 2xl:block" aria-label="왼쪽 사이드바">
                <div className="sticky top-20 flex h-96 items-center justify-center rounded-lg">
                  {/* 광고가 들어올 예정인 빈 공간 */}
                </div>
              </aside>

              {/* --- 메인 콘텐츠 --- */}
              <div>{children}</div>

              {/* --- 오른쪽 사이드바 --- */}
              <aside className="hidden 2xl:block" aria-label="오른쪽 사이드바">
                <div className="sticky top-20 flex h-96 items-center justify-center rounded-lg">
                  {/* 광고가 들어올 예정인 빈 공간 */}
                </div>
              </aside>
            </div>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
