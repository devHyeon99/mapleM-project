interface CharactersSearchResultSkeletonProps {
  name: string;
}

export function CharactersSearchResultSkeleton({
  name,
}: CharactersSearchResultSkeletonProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-col items-center gap-1 py-10">
        <h1 className="text-lg font-bold md:text-2xl">
          전체 월드 내 <strong>&quot;{name}&quot;</strong> 검색 결과
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          검색 결과를 불러오는 중입니다...
        </p>
      </div>

      <div className="flex w-full flex-col gap-0.5 pb-10">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="bg-card animate-pulse rounded-xs border-none py-4.5 shadow-none"
          >
            <div className="flex items-center justify-between px-6">
              <div className="space-y-2">
                <div className="bg-muted h-5 w-32 rounded" />
                <div className="bg-muted h-4 w-20 rounded" />
              </div>
              <div className="bg-muted h-5 w-5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
