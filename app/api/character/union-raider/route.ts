import { NextResponse } from "next/server";
import { nexonFetch, nexonErrorResponse } from "@/shared/api/nexon/server";
import type { ApiResponse } from "@/shared/api/internal";
import type { CharacterUnionRaider } from "@/entities/character";

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
    const data = await nexonFetch<CharacterUnionRaider>("/user/union-raider", {
      params: { ocid },
      cache: "no-store",
    });

    return NextResponse.json<ApiResponse<CharacterUnionRaider>>({ data });
  } catch (e: unknown) {
    return nexonErrorResponse(e);
  }
}
