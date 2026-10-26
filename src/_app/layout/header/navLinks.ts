import { RANKING_LABELS, RANKING_TYPES, rankingHref } from "@/entities/ranking";
import { TOOL_LINKS } from "@/features/tools-navigation";
import { CONTACT_URL } from "@/shared/config/site";

export type NavLink = {
  href: string;
  label: string;
  activePath?: `/${string}`;
  openInNewTab?: boolean;
  prefetch?: boolean;
  badge?: string;
  // 데스크톱 드롭다운 하위 메뉴
  children?: ReadonlyArray<NavLink>;
};

export const navLinks: ReadonlyArray<NavLink> = [
  {
    href: "/ranking",
    label: "랭킹",
    activePath: "/ranking",
    // 월드·페이지가 붙은 하위 경로까지 해당 종류로 활성 처리
    // level 의 href 는 /ranking 이라 /ranking/level/... 은 activePath 로 잡음
    children: RANKING_TYPES.map((type) => ({
      href: rankingHref(type),
      label: RANKING_LABELS[type],
      activePath: `/ranking/${type}`,
    })),
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
    children: TOOL_LINKS,
  },
  {
    href: CONTACT_URL,
    label: "문의",
    openInNewTab: true,
  },
];

/**
 * href 와 정확히 일치하거나, activePath 와 일치하거나 그 하위 경로일 때만 활성으로 본다.
 * `/guild` 가 `/guildhall` 에 매칭되지 않도록 구분자까지 포함해 비교한다.
 */
export function isNavLinkActive(pathname: string | null, link: NavLink) {
  if (!pathname) {
    return false;
  }

  if (pathname === link.href) {
    return true;
  }

  if (!link.activePath) {
    return false;
  }

  return (
    pathname === link.activePath || pathname.startsWith(`${link.activePath}/`)
  );
}
