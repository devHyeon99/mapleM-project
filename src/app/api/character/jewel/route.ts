import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterJewelEquipment } from "@/entities/character/model/types/jewel";

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
    const ocidQ = encodeURIComponent(ocid);

    const data = await nexonFetch<CharacterJewelEquipment>(
      `/character/jewel?ocid=${ocidQ}`,
      { cache: "no-store" },
    );

    return NextResponse.json<ApiResponse<CharacterJewelEquipment>>(
      { data },
      { status: 200 },
    );
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
          message: e instanceof Error ? e.message : "오류 발생",
        },
      },
      { status: 500 },
    );
  }
}
