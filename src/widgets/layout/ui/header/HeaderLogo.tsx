import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      aria-label="메엠지지 홈으로 가기"
      className="flex items-center"
    >
      <strong className="text-xl md:text-2xl">메엠지지</strong>
    </Link>
  );
}
