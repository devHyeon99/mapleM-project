"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"; // 날짜 포맷팅
import { ko } from "date-fns/locale"; // 한국어 로케일
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { useState } from "react";

// 넥슨 API 정책 상수
const MIN_DATE = new Date("2025-11-26"); // 조회 가능한 가장 오래된 날짜
// 랭킹은 02:30에 갱신되지만, 단순화를 위해 오늘 날짜까지 선택 가능하게 함
// (API가 아직 집계 전이면 빈 데이터나 전날 데이터를 줄 것임)

export function RankingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 1. URL 파라미터 가져오기
  const currentWorld = searchParams.get("world_name") || "all";
  const dateParam = searchParams.get("date");

  // URL에 날짜가 있으면 그 날짜, 없으면 오늘 날짜를 기본값으로 사용
  // (API 호출 시 date가 없으면 자동으로 최신 데이터를 가져오지만, UI상 명시하는 것이 좋음)
  const currentDate = dateParam ? new Date(dateParam) : new Date();

  // 2. 월드 변경 핸들러
  const handleWorldChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("world_name");
    } else {
      params.set("world_name", value);
    }
    params.set("page", "1"); // 필터 변경 시 1페이지로 리셋
    router.replace(`${pathname}?${params.toString()}`);
  };

  // 3. 날짜 변경 핸들러
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const params = new URLSearchParams(searchParams.toString());

    // API 포맷: YYYY-MM-DD
    const formattedDate = format(date, "yyyy-MM-dd");

    // 오늘 날짜를 선택했다면 굳이 파라미터에 넣지 않고 최신 조회(제거)할 수도 있지만,
    // 명시적인 조회를 위해 파라미터를 설정합니다.
    params.set("date", formattedDate);

    params.set("page", "1"); // 필터 변경 시 1페이지로 리셋

    router.replace(`${pathname}?${params.toString()}`);
    setIsCalendarOpen(false); // 선택 후 달력 닫기
  };

  return (
    <div className="">
      {/* 좌측: 기본 필터 (월드, 날짜) */}
      <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:gap-4">
        {/* 월드 선택 */}
        <div className="flex w-full flex-col gap-1.5 md:w-auto">
          <span className="text-muted-foreground ml-1 text-sm font-medium">
            월드 선택
          </span>
          <Select value={currentWorld} onValueChange={handleWorldChange}>
            <SelectTrigger className="w-full md:w-[175px] [&_svg]:!opacity-100">
              <SelectValue placeholder="전체 월드" />
            </SelectTrigger>
            <SelectContent>
              {WORLD_NAMES.map((world) => (
                <SelectItem
                  key={world}
                  value={world === "전체" ? "all" : world}
                >
                  {world === "전체" ? "전체 월드" : world}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 날짜 선택 */}
        <div className="flex w-full flex-col gap-1.5 md:w-auto">
          <span className="text-muted-foreground ml-1 text-sm font-medium">
            날짜 선택
          </span>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal transition-none md:w-[175px]"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {currentDate ? (
                  // 예: 2025-11-27 (목)
                  format(currentDate, "yyyy-MM-dd (eee)", { locale: ko })
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
                locale={ko} // 달력 한글화 (월, 화, 수...)
                // [핵심] 날짜 비활성화 로직
                disabled={(date) => {
                  const today = new Date();
                  // 시간 정보를 제거하여 날짜만 비교 (오늘 날짜 선택 가능하게)
                  today.setHours(23, 59, 59, 999);

                  return (
                    date < MIN_DATE || // 2025-11-27 이전 불가
                    date > today // 미래 날짜 불가
                  );
                }}
              />
              <div className="text-muted-foreground border-t p-3 text-center text-xs">
                랭킹은 매일 오전 2:30 이후에 갱신됩니다.
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
