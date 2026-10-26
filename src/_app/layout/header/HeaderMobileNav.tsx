"use client";

import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/shared/ui/sheet";
import { navLinks } from "./navLinks";
import { HeaderNavLink } from "./HeaderNavLink";

export function HeaderMobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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

      {/* 우측 시트, 좌측 분류명·우측 하위 페이지의 2열 섹션 구성 */}
      {/* 화면 너비에서 80px 만 남기고 차지, 기본 sm:max-w-sm 상한은 해제 */}
      <SheetContent
        side="right"
        showCloseButton={false}
        className="data-[side=right]:w-[calc(100%-80px)] data-[side=right]:sm:max-w-none"
      >
        <div className="relative flex h-16 shrink-0 items-center justify-center px-4">
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2"
              aria-label="메뉴 닫기"
            >
              <XIcon className="size-6" />
            </Button>
          </SheetClose>
          <SheetTitle className="text-xl font-semibold tracking-tight">
            MMGG
          </SheetTitle>
          <SheetDescription className="sr-only">
            모바일 전용 메뉴입니다.
          </SheetDescription>
        </div>

        <nav aria-label="모바일 메뉴" className="overflow-y-auto px-5 pb-8">
          {navLinks.map((link) => (
            <section
              key={link.href}
              className="border-border grid grid-cols-[4rem_1fr] gap-x-4 border-b py-5 last:border-b-0"
            >
              {link.children ? (
                <>
                  <h2 className="text-foreground text-lg font-semibold">
                    {link.label}
                  </h2>
                  <ul className="flex list-none flex-col gap-1">
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <HeaderNavLink
                          link={child}
                          onClick={close}
                          className="text-muted-foreground hover:text-foreground data-[active]:text-foreground block py-1.5 text-[15px] font-medium transition-colors data-[active]:font-semibold"
                        />
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <HeaderNavLink
                  link={link}
                  onClick={close}
                  className="text-foreground inline-flex items-start gap-1 text-lg font-semibold"
                />
              )}
            </section>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
