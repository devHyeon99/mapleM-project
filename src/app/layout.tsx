import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
  title: { default: "MMGG", template: "%s | MMGG" },
  description: "메이플스토리M 유저용 서비스",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className} suppressHydrationWarning>
      <body className="bg-background relative flex min-h-screen flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MswProvider>
            <Providers>
              <MockSessionProvider>{children}</MockSessionProvider>
            </Providers>
          </MswProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
