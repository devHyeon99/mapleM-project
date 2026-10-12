import { NextResponse } from "next/server";
import { nexonFetch, nexonErrorResponse } from "@/shared/api/nexon/server";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterVMatrix } from "@/entities/skill/model";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ocid = searchParams.get("ocid")?.trim();

  if (!ocid) {
    return NextResponse.json<ApiResponse<null>>(
      { error: { name: "BadRequest", message: "ocid가 필요합니다." } },
      { status: 400 },
    );
  }

  try {
    const data = await nexonFetch<CharacterVMatrix>("/character/vmatrix", {
      params: { ocid },
      cache: "no-store",
    });

    return NextResponse.json<ApiResponse<CharacterVMatrix>>({ data });
  } catch (e: unknown) {
    return nexonErrorResponse(e);
  }
}
