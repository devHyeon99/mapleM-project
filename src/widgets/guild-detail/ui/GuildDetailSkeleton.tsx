import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { GUILD_TABS, TAB_HEIGHT_CLASS } from "./config";

function GuildCardSkeleton() {
  return (
    <Card className="h-40 w-full border-none">
      <CardContent className="relative px-0">
        <div className="mt-10 flex flex-col items-center gap-4 md:mt-0 md:flex-row md:items-start">
          <Skeleton className="h-16 w-16 shrink-0 rounded-sm md:ml-6" />
          <div className="flex w-full flex-1 flex-col items-center gap-4 md:items-start">
            <div className="flex flex-col items-center gap-1 md:items-start">
              <Skeleton className="h-9 w-40" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex flex-row justify-center gap-6 md:justify-start">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-16" />
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
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="flex h-[45px] shrink-0 items-center gap-4">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="ml-auto h-5 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
