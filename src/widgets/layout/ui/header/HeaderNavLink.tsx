"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavLinkActive, type NavLink } from "./navLinks";

type HeaderNavLinkProps = {
  link: NavLink;
  className?: string;
  onClick?: () => void;
};

/**
 * 헤더 네비게이션 항목
 * 링크 동작(외부 링크 처리, 접근성 속성, 활성 여부)만 담당하고
 * 겉모습은 className 으로 주입받는다.
 * 활성 상태는 data-active 로 노출하므로 `data-[active]:` variant 로 스타일링한다.
 */
export function HeaderNavLink({
  link,
  className,
  onClick,
}: HeaderNavLinkProps) {
  const pathname = usePathname();

  const isExternal = link.openInNewTab ?? link.href.startsWith("http");
  const isActive = isNavLinkActive(pathname, link);

  return (
    <Link
      href={link.href}
      prefetch={link.prefetch}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={isExternal ? `${link.label} (새 창에서 열림)` : undefined}
      aria-current={isActive ? "page" : undefined}
      data-active={isActive || undefined}
      onClick={onClick}
      className={className}
    >
      <span>{link.label}</span>
      {link.badge ? (
        <span
          aria-hidden="true"
          className="text-background rounded-full bg-orange-500 px-1 py-0.5 text-[10px] leading-none font-bold"
        >
          {link.badge}
        </span>
      ) : null}
    </Link>
  );
}
