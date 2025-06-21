import { NextResponse } from "next/server";

const NEXON_API_BASE_URL = "https://open.api.nexon.com/maplestorym/v1";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ocid = searchParams.get("ocid");

  if (!ocid) {
    return NextResponse.json(
      { error: { name: "BadRequest", message: "ocid가 필요합니다." } },
      { status: 400 },
    );
  }

  const NEXON_API_KEY = process.env.NEXON_API_KEY;
  if (!NEXON_API_KEY) {
    return NextResponse.json(
      {
        error: {
          name: "ServerConfigError",
          message: "NEXON_API_KEY가 설정되지 않았습니다.",
        },
      },
      { status: 500 },
    );
  }

  const headers = { "x-nxopen-api-key": NEXON_API_KEY };

  try {
    // 호출할 API 정의
    const requests = {
      basic: fetch(`${NEXON_API_BASE_URL}/character/basic?ocid=${ocid}`, {
        headers,
      }),
      guild: fetch(`${NEXON_API_BASE_URL}/character/guild?ocid=${ocid}`, {
        headers,
      }),
      equip: fetch(
        `${NEXON_API_BASE_URL}/character/item-equipment?ocid=${ocid}`,
        {
          headers,
        },
      ),
      android: fetch(
        `${NEXON_API_BASE_URL}/character/android-equipment?ocid=${ocid}`,
        { headers },
      ),
    };

    // 병렬 실행
    const responses = await Promise.all(Object.values(requests));

    // 에러 응답 체크
    if (responses.some((res) => !res.ok)) {
      const errors = await Promise.all(
        responses.map((res) => res.json().catch(() => null)),
      );
      const firstError = errors.find((err) => err?.error)?.error ?? {
        name: "NexonApiError",
        message: "Nexon API 요청 실패",
      };

      return NextResponse.json({ error: firstError }, { status: 502 });
    }

    // JSON 변환
    const [basicData, guildData, equipData, androidData] = await Promise.all(
      responses.map((res) => res.json()),
    );

    // 안드로이드/하트 데이터 구조 해체
    const { android_equipment, heart_equipment } = androidData ?? {};

    // 최종 합친 데이터 반환
    return NextResponse.json({
      data: {
        ...basicData,
        guild_name: guildData.guild_name ?? null,
        item_equipment: equipData.item_equipment ?? [],
        android_equipment: android_equipment ?? null,
        heart_equipment: heart_equipment ?? null,
      },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      {
        error: {
          name: "InternalServerError",
          message: err instanceof Error ? err.message : "알 수 없는 오류",
        },
      },
      { status: 500 },
    );
  }
}
