import { ModeToggle } from "@/shared/ui/ModeToggle";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileNav } from "./HeaderMobileNav";

export function Header() {
  return (
    <header className="bg-card sticky top-0 z-50 w-full">
      {/* 키보드 사용자가 헤더 내비게이션을 건너뛰고 본문으로 이동 (WCAG 2.4.1) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:bg-card focus:ring-ring focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-2"
      >
        본문 바로가기
      </a>

      <div className="wide:px-0 mx-auto flex h-16 max-w-[1080px] items-center px-4 md:h-20">
        {/* 좌측: 로고 + 데스크탑 네비게이션 */}
        <div className="flex flex-row items-center gap-8">
          <HeaderLogo />
          <HeaderNav />
        </div>

        {/* 우측: 유틸리티 버튼 */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <ModeToggle />
          <HeaderMobileNav />
        </div>
      </div>
    </header>
  );
}
