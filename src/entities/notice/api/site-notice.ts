import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicSupabaseClient } from "@/shared/api/supabase/public-client";
import type { SiteNoticeItem } from "../model/types";

const SITE_NOTICE_LIMIT = 10;
const SITE_NOTICE_REVALIDATE_SECONDS = 600;
const SITE_NOTICE_ERROR_MESSAGE = "사이트 공지사항을 불러오지 못했습니다.";

function isNoticeActive(nowMs: number, notice: SiteNoticeItem) {
  const startMs = notice.start_at
    ? Date.parse(notice.start_at)
    : Number.NEGATIVE_INFINITY;
  const endMs = notice.end_at
    ? Date.parse(notice.end_at)
    : Number.POSITIVE_INFINITY;

  return startMs <= nowMs && nowMs < endMs;
}

async function querySiteNotices(): Promise<SiteNoticeItem[]> {
  // 설정 누락 원인은 클라이언트가 로그로만 남김. 던지는 메시지는 그대로 화면에
  // 렌더되므로, 환경변수 이름이나 Supabase 내부 오류를 담지 않는다.
  const supabase = createPublicSupabaseClient();
  if (!supabase) throw new Error(SITE_NOTICE_ERROR_MESSAGE);

  const { data, error } = await supabase
    .from("notices")
    .select(
      "id,title,content,importance,created_at,start_at,end_at,is_published",
    )
    .eq("is_published", true)
    .order("importance", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(SITE_NOTICE_LIMIT * 3);

  if (error) {
    console.error("Site Notice Query Error:", error);
    throw new Error(SITE_NOTICE_ERROR_MESSAGE);
  }

  const nowMs = Date.now();

  const rows = (data ?? []) as Array<
    SiteNoticeItem & { is_published?: boolean }
  >;

  return rows
    .filter((notice) => isNoticeActive(nowMs, notice))
    .slice(0, SITE_NOTICE_LIMIT);
}

const getCachedSiteNotices = unstable_cache(
  querySiteNotices,
  ["site-notices"],
  {
    revalidate: SITE_NOTICE_REVALIDATE_SECONDS,
    tags: ["site-notices"],
  },
);

export async function getSiteNotices(): Promise<SiteNoticeItem[]> {
  return getCachedSiteNotices();
}
