import { NextResponse } from "next/server";
import { nexonFetch, nexonErrorResponse } from "@/shared/api/nexon/server";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterJewelEquipment } from "@/entities/character";

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
    return nexonErrorResponse(e);
  }
}
