"use client";

import { useNoticeData } from "@/widgets/notice-tabs/model/useNoticeData";
import { BoardListSkeleton } from "@/shared/ui/BoardListSkeleton";

export function PatchNotesTab() {
  const { data, isLoading, isError, error } = useNoticeData("patch");

  if (isLoading) {
    return <BoardListSkeleton count={5} />;
  }

  if (isError) {
    return (
      <p className="p-4 text-center font-medium text-red-500">
        ⚠️ {error.message}
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-muted-foreground p-4 text-center">
        최근 업데이트된 패치 내용이 없습니다.
      </p>
    );
  }

  return (
    <div className="min-h-[150px]">
      <ul className="space-y-2">
        {data.map((item) => (
          <li key={item.notice_id} className="border-b pb-2 last:border-b-0">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors hover:text-blue-500"
            >
              <p className="truncate font-medium">{item.title}</p>
              <p className="text-muted-foreground text-sm">
                {new Date(item.date).toLocaleDateString("ko-KR")}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
