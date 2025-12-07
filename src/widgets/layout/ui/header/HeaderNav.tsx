"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "./navLinks";
import {
  getNavLinkPrefetch,
  getNavLinkAriaLabel,
  isExternalNavLink,
  isNavLinkActive,
} from "./navLinkUtils";
import { cn } from "@/shared/lib/utils";

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요 메뉴" className="hidden items-center gap-8 font-medium md:flex">
      {navLinks.map((link) => {
        const isExternal = isExternalNavLink(link);
        const isActive = isNavLinkActive(pathname, link);

        return (
          <Link
            key={link.href}
            href={link.href}
            prefetch={getNavLinkPrefetch(link)}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={getNavLinkAriaLabel(link)}
            aria-current={isActive ? "page" : undefined}
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
