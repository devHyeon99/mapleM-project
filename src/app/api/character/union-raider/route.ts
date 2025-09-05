import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterUnionRaider } from "@/entities/character/model/types/union";

/**
 * 메이플스토리M 유니온 공격대 정보 조회 API
 * @param req - Request 객체 (ocid 포함)
 */
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
    const data = await nexonFetch<CharacterUnionRaider>(
      `/user/union-raider?ocid=${encodeURIComponent(ocid)}`,
      { cache: "no-store" },
    );

    return NextResponse.json<ApiResponse<CharacterUnionRaider>>({ data });
  } catch (e: unknown) {
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
          message:
            e instanceof Error
              ? e.message
              : "유니온 공격대 정보 조회 중 오류가 발생했습니다.",
        },
      },
      { status: 500 },
    );
  }
}
