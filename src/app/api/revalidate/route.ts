import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");

  // 나만 아는 비밀번호로 보안 처리
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (tag) {
    revalidateTag(tag, {});
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ message: "Missing tag" }, { status: 400 });
}
