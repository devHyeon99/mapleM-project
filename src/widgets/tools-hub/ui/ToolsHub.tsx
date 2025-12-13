"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

const TOOL_LINKS = [
  { href: "/tools", label: "세트옵션 계산기" },
  { href: "/tools/cube", label: "큐브 시뮬레이션" },
  { href: "/tools/potential", label: "추가옵션 시뮬레이션" },
  { href: "/tools/starforce", label: "스타포스 강화" },
] as const;

function isActivePath(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href;
}

interface ToolsHubProps {
  children: ReactNode;
}

export function ToolsHub({ children }: ToolsHubProps) {
  const pathname = usePathname();

  return (
    <section className="flex w-full flex-col">
      <nav
        aria-label="도구 이동"
        className="border-border bg-card mt-2 mb-4 border-b shadow-sm"
      >
        <ul className="grid list-none grid-cols-2 gap-1 md:grid-cols-5">
          {TOOL_LINKS.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-muted-foreground flex h-11 items-center justify-center border-b-2 border-transparent px-3 py-6 text-sm font-medium transition-colors outline-none md:text-base",
                    "hover:border-orange-500 focus-visible:border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2",
                    active &&
                      "text-foreground border-orange-500 hover:border-orange-500",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {children}
    </section>
  );
}
