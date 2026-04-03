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
    <nav aria-label="도구 이동" className="mb-2 w-full">
      <ul className="bg-muted grid list-none grid-cols-2 gap-1 rounded-3xl p-1 shadow-sm md:grid-cols-4">
        {TOOL_LINKS.map((link) => {
          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                prefetch={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-muted-foreground hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-full items-center justify-center rounded-2xl border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-[3px]",
                  isActive && "bg-card/80 text-foreground shadow-sm",
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
