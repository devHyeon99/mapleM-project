import { NextResponse } from "next/server";
import { handleCommonNexonError } from "@/shared/api/nexon";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterDetailData } from "@/entities/character";
import { fetchCharacterDetail } from "@/shared/api/character/detail.server";

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
    const combinedData: CharacterDetailData = await fetchCharacterDetail(ocid);

    return NextResponse.json<ApiResponse<CharacterDetailData>>({
      data: combinedData,
    });
  } catch (e: unknown) {
    // 에러 핸들링 로직은 기존 유지
    try {
      handleCommonNexonError(e);
    } catch (mapped) {
      return NextResponse.json<ApiResponse<null>>(
        {
          error: {
            name: "NexonCommonError",
            message: (mapped as Error).message,
          },
        },
        { status: 503 },
      );
    }

    return NextResponse.json<ApiResponse<null>>(
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
