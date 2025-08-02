import { Skeleton } from "@/shared/ui/skeleton";

interface BoardListSkeletonProps {
  count?: number;
}

export function BoardListSkeleton({ count = 5 }: BoardListSkeletonProps) {
  const skeletonItems = Array.from({ length: count });

  return (
    <div className="space-y-2 py-0.5">
      {skeletonItems.map((_, index) => (
        <div key={index} className="flex flex-col gap-1 py-0.5">
          <Skeleton className="h-6" style={{ width: `${80 - index * 5}%` }} />
          <Skeleton className="h-5 w-1/6" />
        </div>
      ))}
    </div>
  );
}
