import { rankingHref, type RankingHighlight } from "@/entities/ranking";
import { isRealWorldName } from "@/shared/config/constants/worlds";

// 랭킹 필터(world_name/page)와 섞이지 않도록 검색 조건은 별도 파라미터로 둔다.
export const FIND_WORLD_PARAM = "find_world";
export const FIND_NAME_PARAM = "find_name";

export const RANKING_SEARCH_NAME_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
export const RANKING_SEARCH_NAME_ERROR =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";

export interface RankingSearchQuery {
  world: string;
  name: string;
}

const getSingleParam = (param: string | string[] | undefined) =>
  Array.isArray(param) ? param[0] : param;

/**
 * URL 파라미터에서 유효한 검색 조건만 뽑는다.
 * 규칙에 맞지 않으면 null 을 돌려줘 넥슨 API 를 아예 찌르지 않는다.
 */
export function readRankingSearchQuery(searchParams: {
  [key: string]: string | string[] | undefined;
}): RankingSearchQuery | null {
  const world = getSingleParam(searchParams[FIND_WORLD_PARAM])?.trim();
  const name = getSingleParam(searchParams[FIND_NAME_PARAM])?.trim();

  if (!world || !name) return null;
  // ocid 조회는 월드가 특정돼야 하므로 "전체" 는 검색 대상이 아니다.
  if (!isRealWorldName(world)) return null;
  if (!RANKING_SEARCH_NAME_REGEX.test(name)) return null;

  return { world, name };
}

/** 검색 조건을 랭킹 표에서 강조할 캐릭터로 옮긴다. */
export function readRankingHighlight(searchParams: {
  [key: string]: string | string[] | undefined;
}): RankingHighlight | null {
  const query = readRankingSearchQuery(searchParams);
  if (!query) return null;

  return { worldName: query.world, characterName: query.name };
}

/**
 * 검색된 캐릭터가 실제로 보이는 랭킹 페이지 URL.
 * worldName 을 주면 그 월드로 필터링한 목록, 생략하면 전체 월드 목록이다.
 * 이동한 뒤에도 결과 패널과 행 하이라이트가 유지되도록 검색 조건을 함께 싣는다.
 */
export function rankingSearchTargetHref(
  query: RankingSearchQuery,
  { page, worldName }: { page: number; worldName?: string },
): string {
  const params = new URLSearchParams({
    [FIND_WORLD_PARAM]: query.world,
    [FIND_NAME_PARAM]: query.name,
  });

  return `${rankingHref("level", { worldName, page })}?${params.toString()}`;
}
