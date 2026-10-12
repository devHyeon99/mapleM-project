import { NextResponse } from "next/server";
import { nexonFetch, nexonErrorResponse } from "@/shared/api/nexon/server";
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
    const [cashRes, beautyRes] = await Promise.all([
      nexonFetch<CharacterCashEquipmentData>("/character/cashitem-equipment", {
        params: { ocid },
        cache: "no-store",
      }),
      nexonFetch<CharacterBeautyData>("/character/beauty-equipment", {
        params: { ocid },
        cache: "no-store",
      }),
    ]);

    return NextResponse.json<
      ApiResponse<
        CharacterCashEquipmentData & { beauty_data: CharacterBeautyData }
      >
    >({ data: { ...cashRes, beauty_data: beautyRes } }, { status: 200 });
  } catch (e: unknown) {
    return nexonErrorResponse(e);
  }
}
