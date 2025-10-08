"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { cn } from "@/shared/lib/utils";

export function HeaderMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="메뉴 열기"
        >
          {/* 아이콘 크기 약간 확대 */}
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

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "hover:text-accent-foreground flex items-center justify-center rounded-md px-3 py-3 text-base font-medium transition-colors",
                  isActive ? "text-accent-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
