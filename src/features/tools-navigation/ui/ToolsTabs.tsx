"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/shared/lib/utils";

const TOOL_LINKS = [
  { href: "/tools", label: "세트옵션 계산기" },
  { href: "/tools/cube", label: "큐브 시뮬레이터" },
  { href: "/tools/potential", label: "추가옵션 시뮬레이터" },
  { href: "/tools/starforce", label: "스타포스 강화" },
] as const;

export function ToolsTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="도구 이동"
      className="border-border bg-card mt-2 mb-4 border-b shadow-sm"
    >
      <ul className="grid list-none grid-cols-2 gap-1 md:grid-cols-4">
        {TOOL_LINKS.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-muted-foreground flex h-11 items-center justify-center border-b-2 border-transparent px-3 text-sm font-medium transition-colors outline-none md:text-[15px]",
                  "hover:border-orange-500 focus-visible:border-orange-500 focus-visible:ring-2",
                  isActive &&
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
  );
}
