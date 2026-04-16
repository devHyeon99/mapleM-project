import type { ReactNode } from "react";
import { GuildSearch } from "@/features/guild-search";

export default function GuildDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="wide:px-0 flex w-full flex-col items-center px-4 pb-6">
      <search
        className="wide:px-0 my-4 flex w-full max-w-3xl justify-center"
        aria-label="길드 검색"
      >
        <GuildSearch />
      </search>

      {children}
    </div>
  );
}
