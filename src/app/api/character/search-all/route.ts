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

    return { world_name: world, ocid, character_name: name };
  } catch (e: unknown) {
    if (isNexonNotFoundError(e)) return null;
    throw e; // 여기서는 매핑하지 말고 상위로
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

    const fulfilled = settled.filter(
      (r): r is PromiseFulfilledResult<CharacterOcidData | null> =>
        r.status === "fulfilled",
    );

    const rejected = settled.filter(
      (r): r is PromiseRejectedResult => r.status === "rejected",
    );

    const characters = fulfilled
      .map((r) => r.value)
      .filter((v): v is CharacterOcidData => v !== null);

    // 부분 성공이면 OK
    if (characters.length > 0) {
      return NextResponse.json<ApiResponse<CharacterOcidData[]>>(
        { data: characters },
        { status: 200 },
      );
    }

    // 성공이 하나도 없고 실패가 있으면 공통 에러 매핑해서 503/500
    if (rejected.length > 0) {
      try {
        handleCommonNexonError(rejected[0].reason);
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
            message:
              rejected[0].reason instanceof Error
                ? rejected[0].reason.message
                : "오류 발생",
          },
        },
        { status: 500 },
      );
    }

    // 전부 not found(null)인 케이스 정상 빈 배열
    return NextResponse.json<ApiResponse<CharacterOcidData[]>>(
      { data: [] },
      { status: 200 },
    );
  } catch (e: unknown) {
    // 여기서도 공통 에러 메시지 매핑
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
