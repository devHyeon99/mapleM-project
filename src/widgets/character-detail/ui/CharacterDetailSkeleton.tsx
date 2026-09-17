import { Skeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { ALL_TABS, PROFILE_CARD_SHELL_CLASS } from "./config";

function ProfileCardSkeleton() {
  // 자리표시용이라 section/dl 같은 시맨틱은 쓰지 않음.
  // 높이는 실제 카드와 같은 구조·간격에서 나오고, min-h 는 최소 보장선임.
  return (
    <div
      className={cn(PROFILE_CARD_SHELL_CLASS, "min-h-[476px] sm:min-h-[292px]")}
    >
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start">
        {/* 캐릭터 이미지 + 이름 + 카드 버튼 */}
        <div className="flex w-full shrink-0 flex-col items-center gap-2 sm:w-44">
          <Skeleton className="h-25 w-25 rounded-full" />
          <Skeleton className="h-6 w-24" />
          <div className="flex flex-row gap-2 sm:w-full sm:flex-col">
            <Skeleton className="h-7 w-24 sm:w-full" />
            <Skeleton className="h-7 w-24 sm:w-full" />
          </div>
        </div>

        {/* 정보 목록 */}
        <div className="flex w-full flex-col gap-3">
          {/* 레벨 + 전체랭킹 + 월드랭킹 */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-28" />
          </div>
          {/* EXP */}
          <Skeleton className="h-5 w-24" />
          {/* 직업 · 월드 · 길드 */}
          <div className="flex flex-row gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          {/* 유니온 + 전체랭킹 + 월드랭킹 */}
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-28" />
          </div>
          {/* 날짜 4행 */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabNavSkeleton() {
  return (
    <div className="bg-card w-full overflow-hidden rounded-2xl shadow-sm">
      <div className="flex h-12 items-center whitespace-nowrap">
        {ALL_TABS.map((tab) => (
          <div key={tab.value} className="flex h-12 shrink-0 items-center px-5">
            <Skeleton className="h-4 w-14" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabPanelSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-card flex w-full items-center justify-center rounded-2xl p-4 shadow-sm",
        className,
      )}
    >
      <p className="text-muted-foreground text-sm">데이터 불러오는 중...</p>
    </div>
  );
}

export function CharacterDetailSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="캐릭터 정보를 불러오는 중"
      className="flex w-full"
    >
      <div className="flex w-full flex-col gap-2">
        <ProfileCardSkeleton />

        {/* 기본 탭(장비)은 본체와 부속 카드 두 장으로 그려진다. */}
        <div className="flex w-full flex-col gap-2">
          <TabNavSkeleton />
          <TabPanelSkeleton className="min-h-[408px] sm:min-h-[470px]" />
          <TabPanelSkeleton className="min-h-[560px] sm:min-h-[520px]" />
        </div>
      </div>
    </section>
  );
}
