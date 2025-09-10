"use client";

import { ModeToggle } from "@/shared/ui/ModeToggle";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileNav } from "./HeaderMobileNav";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/50 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container max-w-6xl">
        <div className="flex min-h-20 items-center justify-between">
          <HeaderLogo />

          <HeaderNav />

          <div className="flex items-center gap-2">
            <ModeToggle />

            <HeaderMobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
