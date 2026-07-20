"use client";

import { LoadErrorMessage } from "@/shared/ui/LoadErrorMessage";

export default function GuildError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LoadErrorMessage
      title="길드 정보를 불러오지 못했습니다"
      className="pt-8"
      {...props}
    />
  );
}
