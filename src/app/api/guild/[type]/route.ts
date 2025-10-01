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
      result = await nexonFetch<{ oguild_id: string }>(
        `/guild/id?${searchParams.toString()}`,
        { next: { revalidate: 0 } },
      );
    } else if (type === "basic") {
      const oguildId = searchParams.get("oguild_id");

      if (oguildId) {
        result = await nexonFetch<unknown>(
          `/guild/basic?oguild_id=${oguildId}`,
          { next: { revalidate: 900 } },
        );
      } else {
        const idData = await nexonFetch<{ oguild_id: string }>(
          `/guild/id?${searchParams.toString()}`,
          { next: { revalidate: 0 } },
        );

        if (!idData?.oguild_id) {
          return NextResponse.json(
            { error: { message: "길드 식별자를 찾을 수 없습니다." } },
            { status: 404 },
          );
        }

        result = await nexonFetch<unknown>(
          `/guild/basic?oguild_id=${idData.oguild_id}`,
          { next: { revalidate: 900 } },
        );
      }
    } else {
      return NextResponse.json(
        { error: { message: "Invalid request type" } },
        { status: 400 },
      );
    }

    return NextResponse.json({ data: result });
  } catch (e: unknown) {
    console.error("BFF API Error:", e);

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
