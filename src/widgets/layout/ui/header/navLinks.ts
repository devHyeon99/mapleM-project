export type NavLink = {
  href: string;
  label: string;
  activePath?: `/${string}`;
  openInNewTab?: boolean;
  prefetch?: boolean;
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
    href: "https://open.kakao.com/me/maplestorymgg",
    label: "문의",
    openInNewTab: true,
  },
];
