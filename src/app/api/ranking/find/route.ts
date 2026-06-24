import { NextResponse } from "next/server";
import {
  findRankedCharacter,
  readRankingSearchQuery,
} from "@/features/ranking-search/server";
import type { RankingSearchResult } from "@/features/ranking-search";
import type { ApiResponse } from "@/shared/model/types/ApiResponse";

/**
 * 랭킹 페이지가 정적으로 렌더되도록 검색을 클라이언트로 뺐고, 그 조회 창구다.
 * 페이지가 searchParams 를 읽는 순간 라우트 전체가 동적으로 확정되기 때문이다.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = readRankingSearchQuery(searchParams);

  if (!query) {
    return NextResponse.json<ApiResponse<null>>(
      {
        error: {
          name: "BadRequest",
          message: "월드와 캐릭터 이름이 필요합니다.",
        },
      },
      { status: 400 },
    );
  }

  // findRankedCharacter 는 throw 하지 않는다. 캐릭터 없음도 넥슨 장애도 결과의
  // 한 종류로 돌려주므로 200 으로 내보내고, 화면이 상황에 맞는 문구를 고르게 한다.
  return NextResponse.json<ApiResponse<RankingSearchResult>>(
    { data: await findRankedCharacter(query) },
    { status: 200 },
  );
}
