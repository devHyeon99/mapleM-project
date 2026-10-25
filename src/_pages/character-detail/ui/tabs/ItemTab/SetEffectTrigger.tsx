import type { ComponentProps } from "react";
import { ChevronRight, Star } from "lucide-react";

interface SetEffectTriggerProps extends ComponentProps<"button"> {
  name: string;
  count: number;
  /** 적용 중인 스타포스 구간. 없으면 배지 숨김 */
  starForce?: number | null;
}

// 장비·펫 세트 효과 목록 한 줄. DialogTrigger asChild 가 넘기는 props·ref 를 그대로 받음
export const SetEffectTrigger = ({
  name,
  count,
  starForce,
  ...props
}: SetEffectTriggerProps) => {
  return (
    <button
      type="button"
      className="hover:bg-muted/60 focus-visible:ring-ring flex w-full cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
      {...props}
    >
      <span className="min-w-0 flex-1 truncate font-semibold">{name}</span>
      <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
        {count}세트
      </span>
      {starForce ? (
        <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-600 dark:text-yellow-400">
          <Star aria-hidden="true" className="size-3 fill-current" />
          {starForce}
        </span>
      ) : null}
      <ChevronRight
        aria-hidden="true"
        className="text-muted-foreground size-4 shrink-0"
      />
    </button>
  );
};
