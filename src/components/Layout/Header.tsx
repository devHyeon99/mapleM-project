import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/common/ModeToggle";

const navLinks = [
  { href: "/scheduler", label: "스케줄러" },
  { href: "/character", label: "유저검색" },
  { href: "/party", label: "파티모집" },
  { href: "/guild", label: "길드모집" },
  { href: "/guidebook", label: "가이드북" },
];

const Logo = () => (
  <Link
    href="/"
    className="flex items-center space-x-2"
    aria-label="MMGG 홈으로 가기"
  >
    <div className="relative h-6 w-24">
      <strong className="animate-text-cycle-primary absolute inset-0 flex items-center justify-start text-xl font-bold md:text-2xl">
        메엠지지
      </strong>
      <strong className="animate-text-cycle-secondary absolute inset-0 flex items-center justify-start text-xl font-bold md:text-2xl">
        MMGG
      </strong>
    </div>
  </Link>
);

const PcNav = () => (
  <nav
    aria-label="메인 메뉴"
    className="hidden items-center justify-center space-x-1 text-sm font-medium md:flex"
  >
    <ul className="flex items-center">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Button variant="link" className="text-[15px] font-semibold" asChild>
            <Link href={link.href}>{link.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  </nav>
);

const MbNav = () => (
  <div className="md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="메뉴 열기">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="sr-only">모바일 메뉴</SheetTitle>
          <SheetDescription className="sr-only">
            MMGG 사이트의 주요 페이지로 이동할 수 있는 메뉴입니다.
          </SheetDescription>
          <Logo />
        </SheetHeader>
        <nav aria-label="모바일 메뉴" className="flex flex-col gap-2">
          <ul className="flex flex-col items-center gap-4 p-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Button variant="link" className="text-[15px]" asChild>
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                </SheetClose>
              </li>
            ))}
            <li>
              <ModeToggle />
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  </div>
);

const Header = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex min-h-20 w-full items-center justify-center border-b backdrop-blur">
      <div className="container flex h-14 items-center justify-between md:justify-around">
        <Logo />
        <PcNav />
        <div className="flex items-center">
          <Button variant="link" className="text-[15px] font-semibold" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <MbNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
