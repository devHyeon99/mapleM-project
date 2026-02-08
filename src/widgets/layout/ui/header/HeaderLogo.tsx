import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center text-xl font-semibold tracking-tight md:text-3xl"
    >
      MMGG
    </Link>
  );
}
