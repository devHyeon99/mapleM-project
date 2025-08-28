import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import {
  handleCommonNexonError,
  isNexonNotFoundError,
} from "@/shared/api/nexon/handler";
import type { CharacterOcidData } from "@/entities/character";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const world = searchParams.get("world")?.trim();
  const name = searchParams.get("name")?.trim();

  if (!world || !name) {
    return NextResponse.json<ApiResponse<null>>(
      { error: { name: "BadRequest", message: "world, name이 필요합니다." } },
      { status: 400 },
    );
  }

  try {
    const { ocid } = await nexonFetch<{ ocid: string }>(
      `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`,
      { cache: "no-store" },
    );

    const data: CharacterOcidData = {
      world_name: world,
      ocid,
      character_name: name,
    };
    return NextResponse.json<ApiResponse<CharacterOcidData>>({ data });
  } catch (e: unknown) {
    // 캐릭터 없음 → 404
    if (isNexonNotFoundError(e)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: { name: "NotFound", message: "캐릭터를 찾을 수 없습니다." } },
        { status: 404 },
      );
    }

    // 점검/키 오류/429 등 → 503 메시지로 매핑 (handleCommonNexonError가 throw)
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
