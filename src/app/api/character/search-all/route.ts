import { NextResponse } from "next/server";
import { WORLD_NAMES } from "@/shared/config/constants/worlds";
import { nexonFetch } from "@/shared/api/nexon/server";
import {
  handleCommonNexonError,
  isNexonNotFoundError,
} from "@/shared/api/nexon/handler";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";
import type { CharacterOcidData } from "@/entities/character/model/types";

async function fetchOcid(
  world: string,
  name: string,
): Promise<CharacterOcidData | null> {
  try {
    const { ocid } = await nexonFetch<{ ocid: string }>(
      `/id?character_name=${encodeURIComponent(name)}&world_name=${encodeURIComponent(world)}`,
      { cache: "no-store" },
    );

    return {
      world_name: world,
      ocid,
      character_name: name,
    };
  } catch (e: unknown) {
    // 캐릭터 없음은 정상 플로우: null
    if (isNexonNotFoundError(e)) return null;

    // 점검/키 문제/429 등은 공통 에러로 throw 될 수 있음
    handleCommonNexonError(e);

    // 그 외는 상위로 던져서 search-all 전체를 500 처리하게(혹은 정책대로)
    throw e;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name")?.trim();

  if (!name) {
    return NextResponse.json<ApiResponse<null>>(
      { error: { name: "BadRequest", message: "name이 필요합니다." } },
      { status: 400 },
    );
  }

  const worlds = WORLD_NAMES.filter((w) => w !== "전체");

  try {
    const settled = await Promise.allSettled(
      worlds.map((world) => fetchOcid(world, name)),
    );

    // 성공한 것만 + null 제거
    const characters = settled
      .filter(
        (r): r is PromiseFulfilledResult<CharacterOcidData | null> =>
          r.status === "fulfilled",
      )
      .map((r) => r.value)
      .filter((v): v is CharacterOcidData => v !== null);

    return NextResponse.json<ApiResponse<CharacterOcidData[]>>(
      { data: characters },
      { status: 200 },
    );
  } catch (e: unknown) {
    // 여기서도 공통 에러 메시지 매핑(점검/429/키 문제 등) 시도
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
