"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/utils/supabase/client";

export function useGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  }, []);

  return { signInWithGoogle, loading, error };
}
