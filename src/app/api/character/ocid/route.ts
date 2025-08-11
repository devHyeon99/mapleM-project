import { NextResponse } from "next/server";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";
const NEXON_API_KEY = process.env.NEXON_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const character_name = searchParams.get("character_name");
  const world_name = searchParams.get("world_name");

  // 파라미터 검증
  if (!character_name || !world_name) {
    return NextResponse.json(
      {
        error: {
          name: "BadRequest",
          message: "character_name과 world_name 파라미터가 필요합니다.",
        },
      },
      { status: 400 },
    );
  }

  try {
    // Nexon Open API 호출
    const res = await fetch(
      `${NEXON_API_BASE_URL}/id?character_name=${encodeURIComponent(
        character_name,
      )}&world_name=${encodeURIComponent(world_name)}`,
      {
        headers: {
          "x-nxopen-api-key": NEXON_API_KEY!,
        },
        cache: "no-store", // 항상 최신 데이터
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        {
          error: {
            name: "NexonAPIError",
            message: errorText || "Nexon API 요청 실패",
          },
        },
        { status: res.status },
      );
    }

    // 결과 반환
    const data = await res.json();
    return NextResponse.json({ data });
  } catch (err) {
    console.error("OCID API 요청 실패:", err);
    return NextResponse.json(
      {
        error: {
          name: "InternalError",
          message: "Nexon API 요청 중 오류가 발생했습니다.",
        },
      },
      { status: 500 },
    );
  }
}
