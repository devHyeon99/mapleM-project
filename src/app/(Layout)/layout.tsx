import { Header, Footer } from "@/widgets/layout";

export default function LayoutGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background sticky top-0 z-50 mx-auto w-full max-w-[1080px]">
        <Header />
      </header>

      <main className="flex flex-1 flex-col">
        <div className="relative mx-auto flex w-full max-w-[1080px] flex-1 flex-col">
          {/* 왼쪽 광고  */}
          <aside
            className="absolute top-0 -left-[220px] hidden h-full w-[200px] 2xl:hidden"
            aria-label="좌측 광고 영역"
            aria-hidden="true"
          >
            <div className="bg-muted/30 text-muted-foreground sticky top-24 flex h-[600px] w-full items-center justify-center rounded-lg border">
              <span className="text-sm">Left Wing Ad</span>
            </div>
          </aside>

          {/* 실제 페이지별 콘텐츠 */}
          <div className="h-full min-h-[500px] w-full flex-1">{children}</div>

          {/* 오른쪽 광고 */}
          <aside
            className="absolute top-0 -right-[220px] hidden h-full w-[200px] 2xl:hidden"
            aria-label="우측 광고 영역"
            aria-hidden="true"
          >
            <div className="bg-muted/30 text-muted-foreground sticky top-24 flex h-[600px] w-full items-center justify-center rounded-lg border">
              <span className="text-sm">Right Wing Ad</span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
