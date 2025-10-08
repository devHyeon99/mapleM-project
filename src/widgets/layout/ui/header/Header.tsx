"use client";

import { ModeToggle } from "@/shared/ui/ModeToggle";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileNav } from "./HeaderMobileNav";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      {/* ✅ [수정됨] mx-auto 추가: 컨테이너 자체를 화면 중앙에 정렬 */}
      <div className="flex h-16 items-center px-4 md:h-20 md:px-8">
        {/* 좌측: 로고 + 데스크탑 네비게이션 */}
        <div className="mr-4 flex items-center md:mr-12">
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
