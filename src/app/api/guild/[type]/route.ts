import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  const { searchParams } = new URL(req.url);

  try {
    let result: unknown;

    if (type === "id") {
      // world_name, guild_name 파라미터 필요
      result = await nexonFetch<{ oguild_id: string }>(
        `/guild/id?${searchParams.toString()}`,
        { next: { revalidate: 0 } }, // ID 조회는 검색 성격이므로 캐시 최소화
      );
    } else if (type === "basic") {
      // oguild_id 파라미터 필요
      result = await nexonFetch<unknown>(
        `/guild/basic?${searchParams.toString()}`,
        { next: { revalidate: 900 } }, // 상세 정보는 15분 캐시
      );
    } else {
      return NextResponse.json(
        { error: { message: "Invalid request type" } },
        { status: 400 },
      );
    }

    return NextResponse.json({ data: result });
  } catch (e: unknown) {
    // 넥슨 공통 에러 핸들러로 매핑 후 반환
    try {
      handleCommonNexonError(e);
    } catch (mapped: unknown) {
      const errorMessage =
        mapped instanceof Error ? mapped.message : "Service Unavailable";
      return NextResponse.json(
        { error: { message: errorMessage } },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 },
    );
  }
}
