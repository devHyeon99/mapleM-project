import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type {
  CharacterCashEquipmentData,
  CharacterBeautyData,
} from "@/entities/cash-item/model/types";

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

    const [cashRes, beautyRes] = await Promise.all([
      nexonFetch<CharacterCashEquipmentData>(
        `/character/cashitem-equipment?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
      nexonFetch<CharacterBeautyData>(
        `/character/beauty-equipment?ocid=${ocidQ}`,
        { cache: "no-store" },
      ),
    ]);

    return NextResponse.json<
      ApiResponse<
        CharacterCashEquipmentData & { beauty_data: CharacterBeautyData }
      >
    >({ data: { ...cashRes, beauty_data: beautyRes } }, { status: 200 });
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
