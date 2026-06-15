"use client";

import { useEffect, useState } from "react";

/**
 * 넥슨 이미지 서버는 `Access-Control-Allow-Origin` 을 두 번 내려보내서(`'*, *'`)
 * 브라우저의 fetch() 가 CORS 위반으로 막는다. img 태그의 CORS 로딩은 통과한다.
 *
 * html-to-image 는 내부적으로 fetch 로 외부 이미지를 인라인하므로, 그대로 두면
 * 화면에는 캐릭터가 보이는데 저장된 PNG 에서만 빠진다. img + 캔버스로 직접
 * data URL 을 만들어 넘겨서 이 경로를 우회한다.
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
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(image, 0, 0);

      try {
        setInlined({ src, dataUrl: canvas.toDataURL("image/png") });
      } catch (cause) {
        console.warn("캐릭터 이미지를 인라인하지 못했습니다.", cause);
      }
    };

    image.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return inlined?.src === src ? inlined.dataUrl : src;
};
