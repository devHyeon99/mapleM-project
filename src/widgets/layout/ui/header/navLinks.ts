import { CONTACT_URL } from "@/shared/config/site";

export type NavLink = {
  href: string;
  label: string;
  activePath?: `/${string}`;
  openInNewTab?: boolean;
  prefetch?: boolean;
  badge?: string;
};

export const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/ranking",
    label: "랭킹",
    activePath: "/ranking",
  },
  {
    href: "/guild",
    label: "길드",
    activePath: "/guild",
  },
  {
    href: "/tools",
    label: "도구",
    activePath: "/tools",
  },
  {
    href: CONTACT_URL,
    label: "문의",
    openInNewTab: true,
  },
];

/**
 * activePath 와 정확히 일치하거나 그 하위 경로일 때만 활성으로 본다.
 * `/guild` 가 `/guildhall` 에 매칭되지 않도록 구분자까지 포함해 비교한다.
 */
export function isNavLinkActive(pathname: string | null, link: NavLink) {
  if (!pathname || !link.activePath) {
    return false;
  }

  return (
    pathname === link.activePath || pathname.startsWith(`${link.activePath}/`)
  );
}
