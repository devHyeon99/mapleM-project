import { NextResponse } from "next/server";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";
const NEXON_API_KEY = process.env.NEXON_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ocid = searchParams.get("ocid");

  if (!ocid) {
    return NextResponse.json(
      { error: { name: "BadRequest", message: "ocid가 필요합니다." } },
      { status: 400 },
    );
  }

  try {
    // 두 API 요청을 병렬로 시작 (Promise.all)
    const [cashRes, beautyRes] = await Promise.all([
      fetch(`${NEXON_API_BASE_URL}/character/cashitem-equipment?ocid=${ocid}`, {
        headers: { "x-nxopen-api-key": NEXON_API_KEY! },
        cache: "no-store",
      }),
      fetch(`${NEXON_API_BASE_URL}/character/beauty-equipment?ocid=${ocid}`, {
        headers: { "x-nxopen-api-key": NEXON_API_KEY! },
        cache: "no-store",
      }),
    ]);

    // 둘 중 하나라도 실패하면 에러 처리 (필요에 따라 유연하게 변경 가능)
    if (!cashRes.ok) {
      const errorText = await cashRes.text();
      throw new Error(`Cash API Error: ${errorText}`);
    }
    if (!beautyRes.ok) {
      const errorText = await beautyRes.text();
      throw new Error(`Beauty API Error: ${errorText}`);
    }

    const cashData = await cashRes.json();
    const beautyData = await beautyRes.json();

    // 두 데이터를 합쳐서 하나의 객체로 반환
    // beautyData는 { character_hair: {}, character_face: {}, ... } 형태임
    return NextResponse.json({
      data: {
        ...cashData, // cash_item_equipment, presets 등
        beauty_data: beautyData, // 뷰티 정보 별도 키로 분리하거나 spread 해도 됨
      },
    });
  } catch (err) {
    console.error("외형(캐시+뷰티) API 요청 실패:", err);
    return NextResponse.json(
      { error: { name: "InternalError", message: "API 요청 중 오류 발생" } },
      { status: 500 },
    );
  }
}
