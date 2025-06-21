import { NextResponse } from "next/server";

const NEXON_API_BASE_URL =
  "https://open.api.nexon.com/maplestorym/v1/notice-event";
const NEXON_API_KEY = process.env.NEXON_API_KEY;

export async function GET() {
  try {
    const res = await fetch(`${NEXON_API_BASE_URL}`, {
      headers: {
        "x-nxopen-api-key": NEXON_API_KEY!,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: { name: "NexonAPIError", message: errorText } },
        { status: res.status },
      );
    }

    const data = await res.json();

    if (data.event_notice && Array.isArray(data.event_notice)) {
      const topFiveNotices = data.event_notice.slice(0, 5);

      return NextResponse.json({ event_notice: topFiveNotices });
    }

    return NextResponse.json({ event_notice: [] });
  } catch (err) {
    console.error("이벤트 API 요청 실패:", err);
    return NextResponse.json(
      { error: { name: "InternalError", message: "API 요청 중 오류 발생" } },
      { status: 500 },
    );
  }
}
