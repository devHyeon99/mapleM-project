"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";
import { cn } from "@/shared/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 font-medium md:flex">
      {navLinks.map((link) => {
        const isActive = pathname?.startsWith(
          (link.activePath as string) || link.href,
        );

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
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
