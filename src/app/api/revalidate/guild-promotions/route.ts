import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { GUILD_PROMOTIONS_TAG } from "@/entities/guild-promotion/api/get-guild-promotions";

/** 길이가 다르면 비교 자체가 던지므로 먼저 거름. 길이는 어차피 응답 시간에 안 새어나감 */
function matchesSecret(provided: string | undefined, secret: string) {
  if (!provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(secret);

  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * 홍보 글을 쓰거나 고치면 Supabase Database Webhook 이 여기를 때림.
 * 시크릿이 없으면 아무나 캐시를 털 수 있으므로 헤더로 먼저 거른다.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  // 시크릿을 안 걸어두면 라우트를 아예 닫아 둠. 실수로 열린 채 배포되는 걸 막음
  if (!secret) {
    console.error("CRITICAL: REVALIDATE_SECRET 미설정으로 재검증 요청 거부");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const provided = req.headers.get("authorization")?.replace(/^Bearer /, "");
  if (!matchesSecret(provided, secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Next 16 은 두 번째 인자를 요구함. "max" 는 태그가 붙은 캐시를 나이 상관없이 털라는 뜻
  revalidateTag(GUILD_PROMOTIONS_TAG, "max");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
