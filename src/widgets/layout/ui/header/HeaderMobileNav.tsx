"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { navLinks } from "./navLinks";

export function HeaderMobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="메뉴 열기">
            <Menu className="size-5" aria-hidden="true" focusable="false" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-lg">메뉴</SheetTitle>
            <SheetDescription className="sr-only">
              MMGG 사이트의 주요 페이지로 이동할 수 있는 메뉴입니다.
            </SheetDescription>
          </SheetHeader>

          <nav aria-label="모바일 메뉴">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      className="w-full text-center text-base"
                      asChild
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </Button>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
