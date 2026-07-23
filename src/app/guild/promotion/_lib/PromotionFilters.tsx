"use client";

import { useRouter } from "next/navigation";
import { ALL_WORLD_NAME, WORLD_NAMES } from "@/shared/config/constants/worlds";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  promotionHref,
  SORT_OPTIONS,
  type PromotionQuery,
  type PromotionSort,
} from "./params";

const ALL_WORLD_VALUE = "all";

const TRIGGER_CLASS =
  "bg-card hover:bg-accent h-9 w-full border-none text-sm shadow-sm sm:w-[140px] [&_svg]:!opacity-100";

export function PromotionFilters({ query }: { query: PromotionQuery }) {
  const router = useRouter();

  // 필터를 바꾸면 1페이지로 돌아감. 거른 결과의 페이지 수가 원본보다 적음
  const move = (next: Partial<PromotionQuery>) =>
    router.replace(promotionHref({ ...query, ...next, page: 1 }));

  return (
    <div className="flex flex-row gap-2">
      <div className="flex-1 sm:flex-none">
        <label htmlFor="promotion-world-select" className="sr-only">
          월드 선택
        </label>

        <Select
          value={query.world ?? ALL_WORLD_VALUE}
          onValueChange={(value) =>
            move({ world: value === ALL_WORLD_VALUE ? undefined : value })
          }
        >
          <SelectTrigger id="promotion-world-select" className={TRIGGER_CLASS}>
            <SelectValue placeholder="전체 월드" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            {WORLD_NAMES.map((name) => (
              <SelectItem
                key={name}
                value={name === ALL_WORLD_NAME ? ALL_WORLD_VALUE : name}
              >
                {name === ALL_WORLD_NAME ? "전체 월드" : name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 sm:flex-none">
        <label htmlFor="promotion-sort-select" className="sr-only">
          정렬 기준 선택
        </label>

        <Select
          value={query.sort}
          onValueChange={(value) => move({ sort: value as PromotionSort })}
        >
          <SelectTrigger id="promotion-sort-select" className={TRIGGER_CLASS}>
            <SelectValue placeholder="최신순" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={4}>
            {SORT_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
