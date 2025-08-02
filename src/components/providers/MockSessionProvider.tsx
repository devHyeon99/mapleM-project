"use client";

import { useEffect } from "react";
import { patchGetUserForDev } from "@/shared/api/supabase/mockUser";

export function MockSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    patchGetUserForDev();
  }, []);

  return <>{children}</>;
}
