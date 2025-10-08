import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="mr-6 flex items-center gap-2 transition-opacity hover:opacity-90 md:mr-8"
    >
      <span className="text-xl font-semibold tracking-tight md:text-3xl">
        MMGG
      </span>
    </Link>
  );
}
