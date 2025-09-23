"use client";

import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { navLinks } from "./navLinks";

export function HeaderNav() {
  return (
    <nav aria-label="메인 메뉴" className="hidden max-w-3xl flex-1 md:block">
      <ul className="flex items-center gap-1">
        {navLinks.map((link) => {
          return (
            <li key={link.href}>
              <Button
                asChild
                variant="ghost"
                className="h-20 px-10 text-lg underline-offset-8 hover:bg-transparent! hover:underline"
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
