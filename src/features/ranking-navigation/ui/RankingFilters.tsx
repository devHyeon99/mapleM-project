"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  ALL_JOB_VALUE,
  isJobFilterable,
  JOB_PARAM,
  PAGE_PARAM,
  rankingHrefWithQuery,
  readRankingJob,
  type RankingType,
} from "@/entities/ranking";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { HelpPopover } from "@/shared/ui/HelpPopover";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { JOB_GROUPS } from "@/shared/config/constants/jobs";

const RANKING_DATE_HELP_ITEMS = [
  {
    title: "랭킹 업데이트",
    description: "랭킹은 매일 오전 6시경에 1일 1회 집계되어 제공됩니다.",
  },
  {
    title: "랭킹 집계기준",
    description: "전체 랭킹 10,000등 내의 캐릭터만 집계되어 제공됩니다.",
  },
] as const;

const FILTER_TRIGGER_CLASS =
  "bg-muted hover:bg-accent h-10 w-full border-none text-sm shadow-sm md:w-[195px] [&_svg]:!opacity-100";

interface RankingFiltersProps {
  /** 서버에서 랭킹 조회에 사용한 기준 일자(yyyy-MM-dd). 표시 일자와 데이터 일자를 일치시킨다. */
  date: string;
  type: RankingType;
  /** 현재 걸린 월드 필터. 없으면 전체 월드. */
  worldName?: string;
}

export function RankingFilters({ date, type, worldName }: RankingFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentWorld = worldName ?? "all";
  const currentJob = readRankingJob(searchParams) ?? ALL_JOB_VALUE;

  // 경로와 쿼리 양쪽에 페이지가 있을 수 있어, 1페이지로 되돌릴 때 둘 다 지워야 함
  const resetToFirstPage = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(PAGE_PARAM);
    return params;
  };

  // 월드를 바꾸면 1페이지로 돌아감. 직업은 쿼리에 실려 그대로 따라감
  const handleWorldChange = (value: string) =>
    router.replace(
      rankingHrefWithQuery(
        type,
        { worldName: value === "all" ? undefined : value },
        resetToFirstPage(),
      ),
    );

  // 직업도 마찬가지로 1페이지부터. 거른 결과의 총 페이지 수가 원본보다 훨씬 적음
  const handleJobChange = (value: string) => {
    const params = resetToFirstPage();

    if (value === ALL_JOB_VALUE) params.delete(JOB_PARAM);
    else params.set(JOB_PARAM, value);

    router.replace(rankingHrefWithQuery(type, { worldName }, params));
  };

  return (
    <section
      aria-label="랭킹 필터 및 업데이트 정보"
      className="flex w-full flex-col-reverse items-center justify-between gap-2 md:flex-row"
    >
      <div className="flex w-full flex-row gap-2 md:w-auto">
        <div className="flex-1 md:flex-none">
          <label htmlFor="world-select" className="sr-only">
            월드 선택
          </label>

          <Select value={currentWorld} onValueChange={handleWorldChange}>
            <SelectTrigger id="world-select" className={FILTER_TRIGGER_CLASS}>
              <SelectValue placeholder="전체 월드" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="-top-1">
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

        {/* 업적·샤레니안 랭킹은 직업이 실려 오지 않아 셀렉트 자체를 감춤 */}
        {isJobFilterable(type) && (
          <div className="flex-1 md:flex-none">
            <label htmlFor="job-select" className="sr-only">
              직업 선택
            </label>

            <Select value={currentJob} onValueChange={handleJobChange}>
              <SelectTrigger id="job-select" className={FILTER_TRIGGER_CLASS}>
                <SelectValue placeholder="전체 직업" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                sideOffset={4}
                className="-top-1"
              >
                <SelectItem value={ALL_JOB_VALUE}>전체 직업</SelectItem>
                {JOB_GROUPS.map(({ race, jobs }) => (
                  <SelectGroup key={race}>
                    <SelectLabel>{race}</SelectLabel>
                    {jobs.map((job) => (
                      <SelectItem key={job} value={job}>
                        {job}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex flex-row items-center gap-2 self-end">
        <p className="text-muted-foreground text-sm">
          랭킹 기준 : <time dateTime={date}>{date + " 06:00"}</time>
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
