"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { getRankingDate } from "@/shared/lib/ranking-date";

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
      className="wide:px-0 space-y-3 px-4 pt-4 pb-2"
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

      <div className="text-muted-foreground flex w-full shrink-0 flex-col items-center justify-center text-xs md:flex-row md:justify-between md:text-sm">
        <p>
          랭킹 업데이트 날짜 : <time dateTime={displayDate}>{displayDate}</time>
        </p>
        <p>매일 오전 06:00시에 랭킹 갱신이 진행됩니다.</p>
      </div>
    </section>
  );
}
