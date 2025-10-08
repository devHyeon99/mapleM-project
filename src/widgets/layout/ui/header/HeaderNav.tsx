"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";
import { cn } from "@/shared/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    // ✅ gap-8로 간격을 넓히고, 폰트 크기를 text-lg로 설정
    <nav className="hidden items-center gap-8 font-medium md:flex">
      {navLinks.map((link) => {
        const isActive = pathname?.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              // ✅ text-base -> text-lg (PC 기준 시원한 크기)
              "hover:text-foreground text-lg transition-colors",
              isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
