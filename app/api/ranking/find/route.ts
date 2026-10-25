import { NextResponse } from "next/server";
import {
  findRankedCharacter,
  readRankingSearchQuery,
  readSearchableRankingType,
} from "@/features/ranking-search/server";
import type { RankingSearchResult } from "@/features/ranking-search";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = readSearchableRankingType(searchParams);
  const query = readRankingSearchQuery(searchParams);

  if (!type || !query) {
    return NextResponse.json<ApiResponse<null>>(
      {
        error: {
          name: "BadRequest",
          message: "랭킹 종류와 월드, 캐릭터 이름이 필요합니다.",
        },
      },
      { status: 400 },
    );
  }

  return NextResponse.json<ApiResponse<RankingSearchResult>>(
    { data: await findRankedCharacter(type, query) },
    { status: 200 },
  );
}
