import { NextResponse } from "next/server";
import { getCharacterDetails } from "@/entities/character";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ocid = searchParams.get("ocid");

  if (!ocid) {
    return NextResponse.json(
      { error: { name: "BadRequest", message: "ocid가 필요합니다." } },
      { status: 400 },
    );
  }

  try {
    const combinedData = await getCharacterDetails(ocid);
    return NextResponse.json(combinedData);
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("알 수 없는 오류");

    // lib에서 발생시킨 에러를 여기서 잡아서 처리
    if (error.message === "NEXON_API_KEY가 설정되지 않았습니다.") {
      return NextResponse.json(
        { error: { name: "ServerConfigError", message: error.message } },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: {
          name: "InternalServerError",
          message: error.message,
        },
      },
      { status: 502 }, // 넥슨 API 오류일 수 있으므로 502 (Bad Gateway)
    );
  }
}
