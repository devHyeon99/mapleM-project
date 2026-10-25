import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { GUILD_TABS, TAB_HEIGHT_CLASS } from "./config";

// GuildCard 와 같은 DOM 구조를 그대로 따라감.
// 높이를 고정하면 모바일(세로 배치)에서 실제 카드보다 짧아지므로 내용으로 높이를 잡음
function GuildCardSkeleton() {
  return (
    <Card className="w-full border-none">
      <CardContent className="px-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <Skeleton className="size-16 shrink-0 rounded-sm md:ml-6" />
          <div className="w-full flex-1 space-y-4">
            <div className="space-y-1">
              <div className="flex flex-col items-center justify-center md:flex-row md:justify-start md:gap-2">
                <Skeleton className="h-9 w-40" />
                <Skeleton className="mt-1 h-5 w-16 md:self-start" />
              </div>
              <Skeleton className="mx-auto h-5 w-16 md:mx-0" />
            </div>

            <div className="flex flex-row justify-center gap-6 md:justify-start">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 길드원 표 한 줄. 셀 정렬과 패딩은 GuildMemberRow 와 동일함
function MemberRowSkeleton({ height }: { height: string }) {
  return (
    <div className={`flex ${height} shrink-0 items-center border-b`}>
      <div className="w-1/3 px-2">
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex w-1/3 justify-center px-2">
        <Skeleton className="h-5 w-10" />
      </div>
      <div className="flex w-1/3 justify-end px-2">
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
}

export function GuildDetailSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="길드 정보를 불러오는 중"
      className="mx-auto flex w-full flex-col gap-2"
    >
      <GuildCardSkeleton />

      <div className="grid h-10 w-full grid-cols-4 gap-1">
        {GUILD_TABS.map((tab) => (
          <Skeleton key={tab.value} className="h-full w-full" />
        ))}
      </div>

      <Card className={`${TAB_HEIGHT_CLASS} gap-2 overflow-hidden border-none`}>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="h-8 w-24" />
          </div>
          {/* 실제 표는 행 사이 간격 없이 border 로만 나뉘므로 여기서 gap 을 두지 않음 */}
          <div className="flex flex-col">
            <MemberRowSkeleton height="h-10" />
            {Array.from({ length: 24 }, (_, i) => (
              <MemberRowSkeleton key={i} height="h-[45px]" />
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
