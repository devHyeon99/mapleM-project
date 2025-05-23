"use client";

import { useState, useEffect, ReactNode } from "react";

const initMSW = async () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    const { worker } = await import("@/mocks/browser");

    await worker.start({
      onUnhandledRequest(req) {
        // '/_next/image'로 시작하는 요청은 그냥 무시(콘솔에 경고 표시 안 함).
        const url = new URL(req.url);

        if (url.pathname.startsWith("/_next/image")) {
          return;
        }
      },
    });
  }
};

interface MswProviderProps {
  children: ReactNode;
}

export const MswProvider = ({ children }: MswProviderProps) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      initMSW().then(() => {
        setMswReady(true);
      });
    } else {
      setMswReady(true);
    }
  }, []);

  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
};
