import { NextResponse } from "next/server";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1/notice";
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

    // ✅ 수정된 부분: data.notice 배열을 상위 5개만 slice합니다.
    if (data.notice && Array.isArray(data.notice)) {
      const topFiveNotices = data.notice.slice(0, 5);

      // 5개로 잘린 목록을 다시 "notice" 키와 함께 반환합니다.
      return NextResponse.json({ notice: topFiveNotices });
    }

    // notice 배열이 없거나 유효하지 않으면 원래 응답을 반환하거나 에러 처리
    // 여기서는 안전을 위해 빈 배열을 반환하도록 처리할 수 있습니다.
    return NextResponse.json({ notice: [] });
  } catch (err) {
    console.error("공지사항 API 요청 실패:", err);
    return NextResponse.json(
      { error: { name: "InternalError", message: "API 요청 중 오류 발생" } },
      { status: 500 },
    );
  }
}
