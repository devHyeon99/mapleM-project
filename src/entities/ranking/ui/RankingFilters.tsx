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
import { getRankingDate } from "../lib/get-ranking-date";

export function RankingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentWorld = searchParams.get("world_name") || "all";

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

  const date = getRankingDate();
  return (
    <div className="mt-10 mb-2 flex items-center justify-between gap-3">
      <div className="flex flex-1 items-center gap-1.5 md:flex-none">
        <label htmlFor="world-select" className="sr-only">
          월드 선택
        </label>
        <Select value={currentWorld} onValueChange={handleWorldChange}>
          <SelectTrigger
            id="world-select"
            className="w-full rounded-sm md:w-[200px] [&_svg]:!opacity-100"
          >
            <SelectValue placeholder="전체 월드" />
          </SelectTrigger>
          <SelectContent>
            {WORLD_NAMES.map((world) => (
              <SelectItem key={world} value={world === "전체" ? "all" : world}>
                {world === "전체" ? "전체 월드" : world}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 우측 안내 문구: 모바일에서 너무 길면 텍스트를 숨기거나 폰트를 줄이는 처리가 필요할 수 있음 */}
      <div className="text-muted-foreground flex shrink-0 flex-col gap-0.5 rounded-sm text-xs font-semibold">
        <p className="text-foreground self-end">랭킹 갱신일: {date}</p>
        <p>매일 오전 06:00 랭킹 갱신이 진행됩니다.</p>
      </div>
    </div>
  );
}
