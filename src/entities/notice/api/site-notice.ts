import "server-only";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { SiteNoticeItem } from "../model/types";

const SITE_NOTICE_LIMIT = 10;
const SITE_NOTICE_REVALIDATE_SECONDS = 600;

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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseKey) {
    throw new Error(
      "Missing Supabase public key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY).",
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

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
    throw new Error(`사이트 공지사항 조회 실패: ${error.message}`);
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
