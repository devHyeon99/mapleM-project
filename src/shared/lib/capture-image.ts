"use client";

/**
 * 넥슨 이미지 서버는 `Access-Control-Allow-Origin` 을 두 번 내려보내서(`'*, *'`)
 * 브라우저의 fetch() 가 CORS 위반으로 막는다. img 태그의 CORS 로딩은 통과한다.
 *
 * html-to-image 는 내부적으로 fetch 로 외부 이미지를 인라인하므로, 그대로 두면
 * 화면에는 보이는데 저장된 PNG 에서만 이미지가 빠진다. img + 캔버스로 직접
 * data URL 을 만들어 이 경로를 우회한다.
 *
 * 변환에 실패하면 원본 URL 을 그대로 돌려준다. 화면 표시는 유지되고,
 * 저장 결과에서만 해당 이미지가 빠진다.
 */
const toDataUrl = (src: string): Promise<string> =>
  new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) return resolve(src);

      context.drawImage(image, 0, 0);

      try {
        resolve(canvas.toDataURL("image/png"));
      } catch (cause) {
        console.warn("이미지를 인라인하지 못했습니다.", src, cause);
        resolve(src);
      }
    };

    image.onerror = () => resolve(src);
    image.src = src;
  });

const isCrossOrigin = (url: string): boolean => {
  try {
    return new URL(url, window.location.href).origin !== window.location.origin;
  } catch {
    return false;
  }
};

/**
 * 캡처 대상 안의 외부 이미지를 모두 data URL 로 바꾼다.
 * 원래 src 로 되돌리는 함수를 반환하므로 캡처가 끝나면 반드시 호출할 것.
 */
export const inlineRemoteImages = async (
  root: HTMLElement,
): Promise<() => void> => {
  const targets = [...root.querySelectorAll("img")].filter((image) =>
    isCrossOrigin(image.currentSrc || image.src),
  );

  const originals = targets.map((image) => ({
    image,
    src: image.src,
    srcset: image.srcset,
  }));

  await Promise.all(
    targets.map(async (image) => {
      const source = image.currentSrc || image.src;
      const dataUrl = await toDataUrl(source);
      if (dataUrl === source) return;

      // srcset 이 남아 있으면 브라우저가 그쪽 후보를 고를 수 있음
      image.srcset = "";
      image.src = dataUrl;
      await image.decode().catch(() => {});
    }),
  );

  return () => {
    originals.forEach(({ image, src, srcset }) => {
      image.srcset = srcset;
      image.src = src;
    });
  };
};

/**
 * iOS 는 `<a download>` 을 무시해서 눌러도 아무 일이 없다. 아이폰 크롬도 속은
 * WebKit 이라 똑같다. 대신 공유 시트를 띄우면 "이미지 저장" 으로 앨범에 넣을 수 있다.
 *
 * OS 를 UA 로 찍지 않고, 공유 시트가 자연스러운 환경(손가락으로 쓰는 기기)인지로
 * 고른다. 데스크톱은 기존처럼 바로 내려받는다.
 */
const prefersShareSheet = (file: File): boolean => {
  if (typeof navigator === "undefined") return false;
  if (!navigator.canShare?.({ files: [file] })) return false;

  return window.matchMedia("(pointer: coarse)").matches;
};

/**
 * iOS 판별. `<a download>` 무시는 기능 탐지로 알아낼 방법이 없어서 UA 를 본다.
 * (아이패드는 UA 가 맥으로 나와서 터치 지원까지 같이 확인한다.)
 *
 * 공유 시트는 HTTPS 에서만 쓸 수 있다. 사내망 IP(http://172.x.x.x) 로 열어보면
 * navigator.share 가 아예 없어서, iOS 에서는 저장할 방법이 하나도 남지 않는다.
 * 그때는 완성 이미지를 띄워 길게 눌러 저장하게 한다.
 */
const isIOS = (): boolean => {
  if (typeof navigator === "undefined") return false;

  return (
    /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent))
  );
};

export type SaveImageResult =
  /** 내려받기나 공유 시트로 처리됨 */
  | "saved"
  /** 사용자가 공유 시트를 닫음 */
  | "cancelled"
  /** 저장할 방법이 없어 완성 이미지를 길게 눌러야 함 */
  | "long-press";

/** PNG data URL 을 기기에 맞는 방식으로 저장한다. */
export const saveImageDataUrl = async (
  dataUrl: string,
  fileName: string,
): Promise<SaveImageResult> => {
  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], fileName, { type: "image/png" });

  if (prefersShareSheet(file)) {
    try {
      await navigator.share({ files: [file] });
      return "saved";
    } catch (cause) {
      // 사용자가 공유 시트를 닫은 건 실패가 아니다
      if (cause instanceof DOMException && cause.name === "AbortError") {
        return "cancelled";
      }

      console.warn("공유 시트를 열지 못했습니다.", cause);
    }
  }

  if (isIOS()) return "long-press";

  const link = document.createElement("a");
  link.download = fileName;
  link.href = dataUrl;
  link.click();

  return "saved";
};
