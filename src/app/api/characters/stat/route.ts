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
    const requests = {
      stat: fetch(`${NEXON_API_BASE_URL}/character/stat?ocid=${ocid}`, {
        headers: { "x-nxopen-api-key": NEXON_API_KEY! },
        cache: "no-store",
      }),
      setEffect: fetch(
        `${NEXON_API_BASE_URL}/character/set-effect?ocid=${ocid}`,
        {
          headers: { "x-nxopen-api-key": NEXON_API_KEY! },
          cache: "no-store",
        },
      ),
    };

    const responses = await Promise.all(Object.values(requests));

    if (responses.some((res) => !res.ok)) {
      const errors = await Promise.all(
        responses.map((res) => res.text().catch(() => null)),
      );
      const firstError = errors.find((e) => e) ?? "Nexon API 요청 실패";
      return NextResponse.json(
        { error: { name: "NexonAPIError", message: firstError } },
        { status: 502 },
      );
    }

    const [statData, setEffectData] = await Promise.all(
      responses.map((res) => res.json()),
    );

    return NextResponse.json({
      data: {
        stat: statData ?? null,
        set_effect: setEffectData?.set_info ?? [],
      },
    });
  } catch (err) {
    console.error("스탯 정보 요청 실패:", err);
    return NextResponse.json(
      { error: { name: "InternalError", message: "API 요청 중 오류 발생" } },
      { status: 500 },
    );
  }
}
