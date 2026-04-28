import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function CharactersSearchResultSkeleton({
  name = "검색어",
}: {
  name?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-1 py-10">
        <p className="text-lg font-bold md:text-2xl">
          전체 월드 내 <strong>&quot;{name}&quot;</strong> 검색 결과
        </p>
        <p className="text-muted-foreground text-sm md:text-base">
          검색 결과를 불러오는 중입니다...
        </p>
      </div>

      <ul className="flex w-full flex-col gap-2">
        {Array.from({ length: 7 }, (_, index) => (
          <li key={index}>
            <Card className="border-none py-4">
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="flex h-7 items-center">
                    <Skeleton className="h-5 w-32 rounded" />
                  </div>
                  <div className="flex h-5 items-center">
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                </div>
                <Skeleton className="size-5 rounded-full" />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
