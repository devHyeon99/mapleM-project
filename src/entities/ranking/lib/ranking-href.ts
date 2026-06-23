import { worldSlug } from "@/shared/config/constants/worlds";
import type { RankingType } from "../model/types/ranking";

/** 전체 월드를 뜻하는 경로 세그먼트. 뒤에 페이지가 붙을 때만 URL 에 드러난다. */
export const ALL_WORLD_SLUG = "all";

export interface RankingHrefOptions {
  /** 한글 월드명. 생략하면 전체 월드. */
  worldName?: string;
  /** 1-based UI 페이지. */
  page?: number;
}

/**
 * 랭킹 URL 을 만드는 유일한 통로.
 *
 * 규칙은 하나다 — **기본값인 꼬리 세그먼트는 생략한다. 단, 뒤에 값이 오면 생략할 수 없다.**
 * `level` 을 못 지우는 이유와 `all` 을 못 지우는 이유가 같아서, 둘 다 특례가 아니라
 * 이 규칙의 사례가 된다.
 *
 * ```
 * rankingHref("level")                              → /ranking
 * rankingHref("dojang")                             → /ranking/dojang
 * rankingHref("level",  { worldName: "스카니아" })   → /ranking/level/scania
 * rankingHref("dojang", { page: 3 })                → /ranking/dojang/all/3
 * rankingHref("dojang", { worldName: "루나", page: 3 }) → /ranking/dojang/luna/3
 * ```
 */
export function rankingHref(
  type: RankingType,
  { worldName, page = 1 }: RankingHrefOptions = {},
): string {
  const base = `/ranking/${type}`;

  // 월드도 페이지도 기본값이면 꼬리를 전부 지운다. level 은 타입 세그먼트까지 지워진다.
  if (!worldName && page <= 1) return type === "level" ? "/ranking" : base;

  const slug = worldName ? worldSlug(worldName) : ALL_WORLD_SLUG;

  return page <= 1 ? `${base}/${slug}` : `${base}/${slug}/${page}`;
}
