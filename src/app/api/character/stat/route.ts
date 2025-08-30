import { NextResponse } from "next/server";
import { nexonFetch } from "@/shared/api/nexon/server";
import { handleCommonNexonError } from "@/shared/api/nexon/handler";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterStatContainer } from "@/entities/character/model/types/stat";
import type { CharacterHyperStat } from "@/entities/character/model/types/hyper-stat";

export interface CharacterStatData {
  stat: CharacterStatContainer;
  hyperStat: CharacterHyperStat | null;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const ocid = searchParams.get("ocid")?.trim();
  const levelRaw = searchParams.get("level")?.trim(); // 우리 서버 판단용
  const level = Number(levelRaw ?? "0");

  if (!ocid) {
    return NextResponse.json<ApiResponse<null>>(
      { error: { name: "BadRequest", message: "ocid가 필요합니다." } },
      { status: 400 },
    );
  }

  // level이 이상하면 0으로 처리(하이퍼 요청 안 하게)
  const safeLevel = Number.isFinite(level) ? level : 0;

  try {
    const ocidQ = encodeURIComponent(ocid);
    const shouldFetchHyperStat = safeLevel >= 140;

    const [statData, hyperStatData] = await Promise.all([
      nexonFetch<CharacterStatContainer>(`/character/stat?ocid=${ocidQ}`, {
        cache: "no-store",
      }),
      shouldFetchHyperStat
        ? nexonFetch<CharacterHyperStat>(
            `/character/hyper-stat?ocid=${ocidQ}`,
            {
              cache: "no-store",
            },
          )
        : Promise.resolve(null),
    ]);

    const data: CharacterStatData = {
      stat: statData,
      hyperStat: hyperStatData,
    };

    return NextResponse.json<ApiResponse<CharacterStatData>>(
      { data },
      { status: 200 },
    );
  } catch (e: unknown) {
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
