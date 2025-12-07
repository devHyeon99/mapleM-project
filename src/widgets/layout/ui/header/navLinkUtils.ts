import type { NavLink } from "./navLinks";

export function isExternalNavLink(link: NavLink) {
  return link.openInNewTab ?? link.href.startsWith("http");
}

export function isNavLinkActive(pathname: string | null, link: NavLink) {
  if (!pathname || !link.activePath) {
    return false;
  }

  return pathname === link.activePath || pathname.startsWith(`${link.activePath}/`);
}

export function getNavLinkAriaLabel(link: NavLink) {
  if (isExternalNavLink(link)) {
    return `${link.label} (새 창에서 열림)`;
  }

  return link.label;
}

export function getNavLinkPrefetch(link: NavLink) {
  if (isExternalNavLink(link)) {
    return undefined;
  }

  return link.prefetch ?? false;
}
