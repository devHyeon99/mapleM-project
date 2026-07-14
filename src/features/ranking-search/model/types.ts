import type { BaseRanking } from "@/entities/ranking";

/**
 * 검색 결과. 조회는 서버에서, 표시는 클라이언트에서 하므로 타입만 따로 둔다.
 * server-only 모듈에 두면 클라이언트가 타입을 가져오려고 그 경로를 참조하게 된다.
 */
export type RankingSearchResult =
  /** 해당 월드에 그 이름의 캐릭터가 없음 */
  | { status: "no-character" }
  /** 캐릭터는 있지만 전체 10,000위 밖이라 랭킹에 집계되지 않음 */
  | { status: "unranked" }
  | {
      status: "ranked";
      entry: BaseRanking;
      /** 전체 월드 목록에서의 페이지 */
      overallPage: number;
      /** 해당 월드로 필터링한 목록에서의 페이지 */
      worldPage: number;
    }
  | { status: "error"; message: string };
