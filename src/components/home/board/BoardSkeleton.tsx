import { Skeleton } from "@/components/ui/skeleton";

interface BoardListSkeletonProps {
  count?: number;
}

export function BoardListSkeleton({ count = 5 }: BoardListSkeletonProps) {
  const skeletonItems = Array.from({ length: count });

  return (
    <div className="min-h-[150px] space-y-3">
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex flex-col space-y-1 py-1">
          {/* 제목 스켈레톤: 너비가 가변적입니다. */}
          <Skeleton
            className="h-4"
            style={{ width: `${80 - index * 5}%` }} // 목록 아이템마다 너비를 다르게 하여 시각적 다양성 확보
          />
          {/* 날짜 스켈레톤: 너비가 고정적입니다. */}
          <Skeleton className="h-3 w-1/4" />
        </div>
      ))}
    </div>
  );
}
