import { navLinks } from "./navLinks";
import { HeaderNavLink } from "./HeaderNavLink";
import { HeaderNavItem } from "./HeaderNavItem";

export function HeaderNav() {
  return (
    <nav
      aria-label="주요 메뉴"
      className="hidden items-center gap-4 font-medium md:flex"
    >
      {navLinks.map((link) => (
        <HeaderNavItem key={link.href}>
          <HeaderNavLink
            link={link}
            className="text-muted-foreground hover:text-foreground data-[active]:text-foreground group-hover:text-foreground inline-flex items-start gap-1 rounded-md px-4 py-1 text-lg transition-colors"
          />
          {link.children ? (
            // 크롤러용으로 항상 렌더링, hover·키보드 포커스(focus-visible) 일 때만 노출
            // focus-within 은 마우스 클릭 후에도 남아 다른 메뉴 hover 시 두 개가 함께 열림
            // pt-2 는 버튼과 메뉴 사이 hover 끊김 방지용 여백
            // left-4 는 링크 px-4 만큼 밀어 메뉴 왼쪽 모서리를 라벨 글자 시작점에 맞춤
            // 카드식 무테두리 패널과 도구 탭식 bg-muted hover 스타일 차용
            <div className="invisible absolute top-full left-4 z-50 -translate-y-1 pt-2 opacity-0 transition-[opacity,visibility,translate] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:translate-y-0 group-has-[:focus-visible]:opacity-100 group-data-closed:hidden motion-reduce:translate-y-0">
              <ul className="bg-card grid w-max min-w-36 list-none gap-0.5 rounded-2xl p-1 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.15)] ring-1 ring-black/5 dark:shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)] dark:ring-white/10">
                {link.children.map((child) => (
                  <li key={child.href}>
                    <HeaderNavLink
                      link={child}
                      className="text-muted-foreground hover:text-foreground data-[active]:text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:text-foreground block rounded-xl px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors outline-none data-[active]:font-semibold"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </HeaderNavItem>
      ))}
    </nav>
  );
}
