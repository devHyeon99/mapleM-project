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
              "hover:text-foreground inline-flex items-start gap-1 text-lg transition-colors",
              isActive
                ? "text-foreground font-semibold"
                : "text-muted-foreground",
            )}
          >
            <span>{link.label}</span>
            {link.href === "/tools" ? (
              <span
                aria-hidden="true"
                className="bg-orange-500 text-background rounded-full px-1 py-0.5 text-[10px] leading-none font-bold"
              >
                N
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
