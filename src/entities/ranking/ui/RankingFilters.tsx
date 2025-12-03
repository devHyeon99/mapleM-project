"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { HelpPopover } from "@/shared/ui/HelpPopover";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { getRankingDate } from "@/shared/lib/ranking-date";

const RANKING_DATE_HELP_ITEMS = [
  {
    title: "랭킹 업데이트",
    description: "랭킹은 매일 오전 6시경에 1일 1회 집계되어 제공됩니다.",
  },
] as const;

export function RankingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentWorld = searchParams.get("world_name") || "all";
  const displayDate = getRankingDate();

  const handleWorldChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("world_name");
    } else {
      params.set("world_name", value);
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section
      aria-label="랭킹 필터 및 업데이트 정보"
      className="wide:px-0 flex w-full flex-col-reverse items-center justify-between gap-2 p-4 md:flex-row"
    >
      <div className="w-full md:w-auto">
        <label htmlFor="world-select" className="sr-only">
          월드 선택
        </label>

        <Select value={currentWorld} onValueChange={handleWorldChange}>
          <SelectTrigger
            id="world-select"
            className="h-10 w-full text-sm md:w-[195px] [&_svg]:!opacity-100"
          >
            <SelectValue placeholder="전체 월드" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4} className="-top-1">
            {WORLD_NAMES.map((world) => (
              <SelectItem key={world} value={world === "전체" ? "all" : world}>
                {world === "전체" ? "전체 월드" : world}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row items-center gap-2 self-end">
        <p className="text-muted-foreground text-sm">
          랭킹 기준 : <time dateTime={displayDate}>{displayDate}</time>
        </p>
        <HelpPopover
          ariaLabel="랭킹 기준 안내"
          items={RANKING_DATE_HELP_ITEMS}
          iconClassName="size-4"
          triggerClassName="shrink-0"
        />
      </div>
    </section>
  );
}
