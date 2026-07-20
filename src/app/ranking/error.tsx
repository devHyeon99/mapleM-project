"use client";

import { LoadErrorMessage } from "@/shared/ui/LoadErrorMessage";

export default function RankingError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LoadErrorMessage
      title="랭킹 정보를 불러오지 못했습니다"
      className="py-16"
      {...props}
    />
  );
}
