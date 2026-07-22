import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * 공개 데이터 조회용 Supabase 클라이언트.
 *
 * 쿠키/세션이 필요 없는 읽기 전용 경로에서 씀. 설정이 없으면 null 을 돌려주고
 * 원인은 로그로만 남김. 호출부가 던지는 메시지는 화면에 그대로 렌더되므로
 * 환경변수 이름이 거기 섞이면 안 됨
 */
export function createPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "CRITICAL: Supabase 설정 누락. NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY(또는 _ANON_KEY)를 확인하세요.",
    );
    return null;
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * 게시자가 넣은 URL 을 링크·이미지로 쓰기 전 거르는 관문.
 * `javascript:` 같은 스킴이 href 로 들어가는 걸 막음
 */
export function safeHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;

  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:" ? value : null;
  } catch {
    return null;
  }
}
