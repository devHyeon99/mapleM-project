import { Skeleton } from "@/shared/ui/skeleton";

function ProfileCardSkeleton() {
  return (
    <article className="bg-card w-full rounded-xs p-4 shadow-sm sm:p-6">
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start">
        {/* 캐릭터 이미지 + 이름 */}
        <div className="flex w-full shrink-0 flex-col items-center gap-2 sm:w-44">
          <Skeleton className="h-25 w-25 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>

        {/* 정보 목록 */}
        <dl className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
          </div>
        </dl>
      </div>
    </article>
  );
}

const TAB_LABELS = [
  "장비",
  "외형",
  "스탯",
  "쥬얼",
  "심볼",
  "스킬",
  "링크",
  "유니온",
  "V매트릭스",
  "HEXA스킬",
  "HEXA스탯",
];

function TabNavSkeleton() {
  return (
    <div className="bg-card w-full">
      <div className="flex h-12 items-center gap-0 overflow-hidden px-1">
        {TAB_LABELS.map((label) => (
          <div
            key={label}
            className="flex h-12 shrink-0 items-center px-5 md:px-10"
          >
            <Skeleton className="h-4 w-10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabContentSkeleton() {
  return (
    <div className="bg-card flex min-h-[650px] w-full items-center justify-center rounded-xs p-4">
      <p className="text-muted-foreground text-sm">데이터 불러오는 중...</p>
    </div>
  );
}

export function CharacterDetailSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="캐릭터 정보를 불러오는 중"
      className="flex w-full justify-center"
    >
      <div className="flex w-full flex-col gap-2">
        <ProfileCardSkeleton />
        <div className="flex w-full flex-col gap-2">
          <TabNavSkeleton />
          <TabContentSkeleton />
        </div>
      </div>
    </section>
  );
}
