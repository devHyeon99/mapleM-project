"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/shared/ui/sheet";
import { navLinks } from "./navLinks";
import { HeaderNavLink } from "./HeaderNavLink";

export function HeaderMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="메뉴 열기"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-[300px] flex-col gap-6">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <span className="text-xl font-extrabold">메엠지지</span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            모바일 전용 메뉴입니다.
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="모바일 메뉴" className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <HeaderNavLink
              key={link.href}
              link={link}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-accent-foreground data-[active]:text-accent-foreground flex items-center justify-center gap-1 rounded-md px-3 py-3 text-base font-medium transition-colors"
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
