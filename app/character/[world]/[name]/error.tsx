"use client";

import { LoadErrorMessage } from "@/shared/ui/LoadErrorMessage";

export default function CharacterError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LoadErrorMessage
      title="캐릭터 정보를 불러오지 못했습니다"
      className="mt-4.5"
      {...props}
    />
  );
}
