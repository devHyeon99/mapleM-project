import "server-only";
import { unstable_cache } from "next/cache";
import {
  createPublicSupabaseClient,
  safeHttpUrl,
} from "@/shared/api/supabase/public-client";
import type { GuildPromotionItem } from "../model/types";

const PROMOTION_MAX = 60;
/**
 * 홍보 글은 자주 올라오지 않음.
 * 즉시 반영이 필요하면 /api/revalidate/guild-promotions 를 직접 때리면 됨
 */
const PROMOTION_REVALIDATE_SECONDS = 3600;

export const GUILD_PROMOTIONS_TAG = "guild-promotions";

function isActive(nowMs: number, item: GuildPromotionItem) {
  const startMs = item.start_at
    ? Date.parse(item.start_at)
    : Number.NEGATIVE_INFINITY;
  const endMs = item.end_at
    ? Date.parse(item.end_at)
    : Number.POSITIVE_INFINITY;

  return startMs <= nowMs && nowMs < endMs;
}

async function queryGuildPromotions(): Promise<GuildPromotionItem[]> {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("guild_promotions")
    .select(
      "id,world_name,guild_name,headline,description,contact_url,created_at,start_at,end_at",
    )
    .eq("is_published", true)
    // 이미 끝난 홍보는 가져오지 않음. 안 그러면 만료 글이 PROMOTION_MAX 칸을 갉아먹음.
    // 캐시된 시각 기준이라 그 뒤에 만료되는 건 못 거르지만, 그건 isActive 가 잡음
    .or(`end_at.is.null,end_at.gt.${new Date().toISOString()}`)
    .order("created_at", { ascending: false })
    .limit(PROMOTION_MAX);

  // 홍보는 보조 섹션임. 테이블이 아직 없거나 조회가 깨져도 길드 검색을 막지 않고
  // 빈 목록으로 떨어뜨림. 그 자리에는 홍보 문의 안내가 대신 뜸
  if (error) {
    console.error("Guild Promotion Query Error:", error);
    return [];
  }

  return (data ?? []).map((item) => ({
    ...item,
    // 게시자가 넣은 값이라 링크로 쓰기 전에 스킴을 거름
    contact_url: safeHttpUrl(item.contact_url),
  }));
}

const getCachedGuildPromotions = unstable_cache(
  queryGuildPromotions,
  [GUILD_PROMOTIONS_TAG],
  {
    revalidate: PROMOTION_REVALIDATE_SECONDS,
    tags: [GUILD_PROMOTIONS_TAG],
  },
);

/**
 * 노출 중인 홍보 목록. limit 을 주면 앞에서부터 잘라 돌려줌.
 *
 * 노출 기간 판정과 자르기는 캐시 바깥에서 함. 캐시 안에서 걸러 두면 start_at 이
 * 지나도 캐시가 살아 있는 동안은 안 뜨고, end_at 이 지난 홍보도 안 내려감.
 * 자르기를 밖에 둔 덕에 목록 페이지와 길드 페이지 섹션이 같은 캐시를 씀.
 *
 * 다만 판정 주기는 라우트 캐시가 정함. 동적인 /guild/promotion 은 매 요청,
 * 정적인 /guild 는 재생성 때만임
 */
export async function getGuildPromotions(
  limit?: number,
): Promise<GuildPromotionItem[]> {
  const items = await getCachedGuildPromotions();

  const nowMs = Date.now();
  const active = items.filter((item) => isActive(nowMs, item));

  return limit === undefined ? active : active.slice(0, limit);
}
