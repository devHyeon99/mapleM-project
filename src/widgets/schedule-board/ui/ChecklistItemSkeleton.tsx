"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export const ChecklistItemSkeleton = () => {
  return (
    <div className="flex min-h-[61px] items-center space-x-2 py-1">
      <Skeleton className="h-5 flex-1" />
      <Skeleton className="h-5 w-5 rounded-sm" />
    </div>
  );
};
