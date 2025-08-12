import { Skeleton } from "@/shared/ui/skeleton";

export const CharacterDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex h-85.5 w-[340px] flex-col items-center gap-4 rounded-md border p-2">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-4 w-32" />
        <div className="flex w-[300px] flex-col gap-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-90 w-full" />
      </div>
    </div>
  );
};
