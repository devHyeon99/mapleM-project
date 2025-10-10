"use client";

import { ModeToggle } from "@/shared/ui/ModeToggle";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileNav } from "./HeaderMobileNav";

export function Header() {
  return (
    <div className="container-wrapper wide:px-0 px-4">
      <div className="flex h-16 items-center md:h-20">
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
    </div>
  );
}
