import { navLinks } from "./navLinks";
import { HeaderNavLink } from "./HeaderNavLink";

export function HeaderNav() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="hidden items-center gap-4 font-medium md:flex"
    >
      {navLinks.map((link) => (
        <HeaderNavLink
          key={link.href}
          link={link}
          className="text-muted-foreground hover:text-foreground hover:bg-accent data-[active]:text-foreground inline-flex items-start gap-1 rounded-md px-4 py-1 text-lg transition-colors"
        />
      ))}
    </nav>
  );
}
