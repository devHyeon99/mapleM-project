import { isRealWorldName } from "@/shared/config/constants/worlds";

/** 한 페이지에 보여줄 홍보 개수 */
export const PAGE_SIZE = 10;

export const WORLD_PARAM = "world";
export const SORT_PARAM = "sort";
export const PAGE_PARAM = "page";

export const SORT_OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
] as const;

export type PromotionSort = (typeof SORT_OPTIONS)[number]["value"];

export interface PromotionQuery {
  /** 없으면 전체 월드 */
  world?: string;
  sort: PromotionSort;
  page: number;
}

type RawSearchParams = Record<string, string | string[] | undefined>;

/** 쿼리는 사용자가 직접 고칠 수 있음. 모르는 값은 기본값으로 떨어뜨림 */
export function readPromotionQuery(params: RawSearchParams): PromotionQuery {
  const world = params[WORLD_PARAM];
  const page = Number(params[PAGE_PARAM]);

  return {
    world:
      typeof world === "string" && isRealWorldName(world) ? world : undefined,
    sort: params[SORT_PARAM] === "oldest" ? "oldest" : "latest",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

/** 기본값(전체 월드·최신순·1페이지)은 빼서 URL 을 짧게 유지함 */
export function promotionHref({ world, sort, page }: PromotionQuery): string {
  const params = new URLSearchParams();

  if (world) params.set(WORLD_PARAM, world);
  if (sort === "oldest") params.set(SORT_PARAM, sort);
  if (page > 1) params.set(PAGE_PARAM, String(page));

  const query = params.toString();
  return query ? `/guild/promotion?${query}` : "/guild/promotion";
}
