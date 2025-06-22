import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function LayoutGroup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2.5 py-6">
        <div className="grid grid-cols-1 gap-8 lg:mx-auto lg:max-w-[1080px] 2xl:max-w-[1800px] 2xl:grid-cols-[200px_1fr_200px]">
          <aside className="hidden 2xl:block" aria-label="왼쪽 사이드바">
            <div className="sticky top-20 flex h-96 items-center justify-center rounded-lg"></div>
          </aside>
          {children}
          <aside className="hidden 2xl:block" aria-label="오른쪽 사이드바">
            <div className="sticky top-20 flex h-96 items-center justify-center rounded-lg"></div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
