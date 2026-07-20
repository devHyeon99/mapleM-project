"use client";

import { LoadErrorMessage } from "@/shared/ui/LoadErrorMessage";

/**
 * 세그먼트별 error.tsx 가 없는 라우트(홈·도구·캐릭터 검색 등)를 받는 기본 경계.
 * 여기까지 안 잡히면 Next 내장 화면("Application error…", 영어)으로 떨어짐.
 * 루트 레이아웃 자체가 터지는 경우는 이 경계 바깥이라 global-error.tsx 몫임.
 */
export default function RootError(props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <LoadErrorMessage
      title="페이지를 불러오지 못했습니다"
      className="flex-1 py-16"
      {...props}
    />
  );
}
