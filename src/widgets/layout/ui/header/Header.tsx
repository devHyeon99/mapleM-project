"use client";

import { ModeToggle } from "@/shared/ui/ModeToggle";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileNav } from "./HeaderMobileNav";

export function Header() {
  return (
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
  );
}
