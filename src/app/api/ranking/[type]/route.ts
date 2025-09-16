import { NextResponse } from "next/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import { fetchWithRankingFallback } from "@/shared/api/nexon/ranking-fallback";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ type: string }> },
) {
  const { type } = await params;
  const { searchParams } = new URL(req.url);

  // 파라미터 추출
  const date = searchParams.get("date")?.trim();
  const restParams = {
    world_name: searchParams.get("world_name")?.trim(),
    ocid: searchParams.get("ocid")?.trim(),
    page: searchParams.get("page") || "1",
  };

  try {
    const data = await fetchWithRankingFallback(
      `/ranking/${type}`,
      restParams,
      date,
    );
    return NextResponse.json({ data });
  } catch (e: unknown) {
    try {
      handleCommonNexonError(e);
    } catch (mapped) {
      return NextResponse.json(
        {
          error: {
            name: "NexonCommonError",
            message: (mapped as Error).message,
          },
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        error: {
          name: "InternalError",
          message: e instanceof Error ? e.message : "오류 발생",
        },
      },
      { status: 500 },
    );
  }
}
