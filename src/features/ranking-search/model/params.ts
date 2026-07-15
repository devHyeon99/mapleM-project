import {
  isRankingType,
  isSharenianRanking,
  rankingHref,
  type RankingHighlight,
  type RankingType,
} from "@/entities/ranking";
import { isRealWorldName } from "@/shared/config/constants/worlds";

// 랭킹 필터(경로 세그먼트)와 섞이지 않도록 검색 조건은 쿼리 파라미터로 둔다.
export const FIND_WORLD_PARAM = "find_world";
export const FIND_NAME_PARAM = "find_name";
/** 랭킹 종류는 페이지 URL 이 경로로 이미 갖고 있어, 조회 API 로 갈 때만 씀 */
export const FIND_TYPE_PARAM = "type";

export const RANKING_SEARCH_NAME_REGEX = /^[a-zA-Z0-9가-힣]{2,8}$/;
export const RANKING_SEARCH_NAME_ERROR =
  "캐릭터명은 2~8자의 한글, 영어, 숫자만 가능합니다.";

export interface RankingSearchQuery {
  world: string;
  name: string;
}

/**
 * URL 파라미터에서 유효한 검색 조건만 뽑는다.
 * 규칙에 맞지 않으면 null 을 돌려줘 넥슨 API 를 아예 찌르지 않는다.
 *
 * 클라이언트의 `useSearchParams()` 와 라우트 핸들러의 `new URL(req.url).searchParams`
 * 가 같은 타입이라, 검증을 양쪽에 복제하지 않고 이 함수 하나로 끝낸다.
 */
export function readRankingSearchQuery(
  params: URLSearchParams,
): RankingSearchQuery | null {
  const world = params.get(FIND_WORLD_PARAM)?.trim();
  const name = params.get(FIND_NAME_PARAM)?.trim();

  if (!world || !name) return null;
  // ocid 조회는 월드가 특정돼야 하므로 "전체" 는 검색 대상이 아니다.
  if (!isRealWorldName(world)) return null;
  if (!RANKING_SEARCH_NAME_REGEX.test(name)) return null;

  return { world, name };
}

/**
 * 검색 대상이 되는 랭킹 종류만 추출.
 * 샤레니안은 길드 랭킹이라 캐릭터가 없어 검색 자체가 성립하지 않음
 */
export function readSearchableRankingType(
  params: URLSearchParams,
): RankingType | null {
  const type = params.get(FIND_TYPE_PARAM);
  if (!isRankingType(type) || isSharenianRanking(type)) return null;

  return type;
}

/** 검색 조건을 랭킹 표에서 강조할 캐릭터로 옮긴다. */
export function readRankingHighlight(
  params: URLSearchParams,
): RankingHighlight | null {
  const query = readRankingSearchQuery(params);
  if (!query) return null;

  return { worldName: query.world, characterName: query.name };
}

/** 검색 조건을 쿼리스트링으로. 검색 결과를 유지한 채 이동할 때 쓴다. */
export function rankingSearchParams(
  query: RankingSearchQuery,
): URLSearchParams {
  return new URLSearchParams({
    [FIND_WORLD_PARAM]: query.world,
    [FIND_NAME_PARAM]: query.name,
  });
}

/**
 * 검색된 캐릭터가 실제로 보이는 랭킹 페이지 URL.
 * 랭킹 종류는 경로 세그먼트라 쿼리에 싣지 않음
 * worldName 을 주면 그 월드로 필터링한 목록, 생략하면 전체 월드 목록이다.
 * 이동한 뒤에도 결과 패널과 행 하이라이트가 유지되도록 검색 조건을 함께 싣는다.
 */
export function rankingSearchTargetHref(
  type: RankingType,
  query: RankingSearchQuery,
  { page, worldName }: { page: number; worldName?: string },
): string {
  return `${rankingHref(type, { worldName, page })}?${rankingSearchParams(query)}`;
}
