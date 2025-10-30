import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BLOCKED_BOT_PATTERNS = [/claudebot/i, /amazonbot/i];

function isBlockedBot(userAgent: string): boolean {
  return BLOCKED_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (isBlockedBot(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
