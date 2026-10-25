"use client";

import { useEffect, useState } from "react";

import { imageToDataUrl } from "@/shared/lib/capture-image";

/**
 * html-to-image 는 내부적으로 fetch 로 외부 이미지를 인라인하는데, 넥슨 이미지
 * 서버는 CORS 응답이 일정하지 않아 그대로 두면 화면에는 캐릭터가 보이는데
 * 저장된 PNG 에서만 빠진다. 같은 출처 중계로 받은 data URL 을 넘겨 우회한다.
 *
 * 변환에 실패하면 원본 URL 을 그대로 돌려준다. 화면 표시는 유지되고,
 * 저장 결과에서만 캐릭터가 빠진다.
 */
export const useInlinedImage = (src: string): string => {
  // 어떤 src 로 만든 결과인지 같이 들고 있어야, src 가 바뀐 직후 한 프레임 동안
  // 이전 캐릭터의 이미지가 남지 않는다.
  const [inlined, setInlined] = useState<{
    src: string;
    dataUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!src) return;

    let cancelled = false;

    imageToDataUrl(src).then((dataUrl) => {
      if (!cancelled) setInlined({ src, dataUrl });
    });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return inlined?.src === src ? inlined.dataUrl : src;
};
