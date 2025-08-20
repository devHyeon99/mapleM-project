"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/shared/api/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase는 쿠키에 세션 저장을 시도
      // 여기서 세션 확인 후 홈으로 보내거나 원하는 곳으로 redirect 가능
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/"); // 로그인 성공 → 메인으로
      } else {
        router.replace("/login?error=auth_failed"); // 실패 시 다시 로그인 페이지
      }
    };

    handleCallback();
  }, [router]);

  return (
    <main className="flex min-h-dvh items-center justify-center">
      <p>로그인 처리 중입니다...</p>
    </main>
  );
}
