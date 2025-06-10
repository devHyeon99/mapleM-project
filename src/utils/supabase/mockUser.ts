import { supabase } from "./client";
import type { User } from "@supabase/supabase-js";

export function patchGetUserForDev() {
  if (process.env.NODE_ENV !== "development") return;

  const mockUser: User = {
    id: "mock-user-id",
    email: "dev@example.com",
    aud: "authenticated",
    created_at: new Date().toISOString(),
    app_metadata: { provider: "email", providers: ["email"] },
    user_metadata: {},
    identities: [],
    role: "authenticated",
  };

  supabase.auth.getUser = async () => {
    return {
      data: { user: mockUser },
      error: null,
    };
  };

  console.log(
    "✅ 개발 환경에서 Supabase getUser가 항상 로그인된 상태로 동작합니다",
  );
}
