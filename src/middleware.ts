import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 현재 시간 포맷팅
  const now = new Date();
  const timeParams: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const timestamp = now.toLocaleTimeString("ko-KR", timeParams);

  // 색상 코드
  const cyan = "\x1b[36m";
  const reset = "\x1b[0m";

  // 로그 출력
  console.log(
    `${cyan}[${timestamp}]${reset} ${request.method} ${decodeURIComponent(
      request.nextUrl.pathname,
    )}`,
  );

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래 패턴에 해당하는 경로는 미들웨어를 실행하지 않음 (로그 제외):
     * _next/static (정적 빌드 파일)
     * _next/image (Next.js 이미지 최적화)
     * favicon.ico, mockServiceWorker.js (특정 시스템 파일)
     * .png, .jpg, .svg, .json 등 확장자가 있는 모든 정적 파일
     */
    "/((?!_next/static|_next/image|favicon.ico|mockServiceWorker.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|json)$).*)",
  ],
};
