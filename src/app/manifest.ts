import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/shared/config/site";

// 안드로이드 홈 화면 추가와 PWA 설치에 쓰임. 아이콘은 192/512 두 사이즈가 필수.
// purpose 를 any/maskable 로 나눠 선언해야 런처가 자체 마스크를 씌울 때 잘리지 않음.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - 메이플스토리M 캐릭터 검색 & 종합 정보`,
    short_name: SITE_NAME,
    description:
      "메이플스토리M 캐릭터 정보, 랭킹, 게임 정보를 한눈에 확인하세요.",
    start_url: "/",
    display: "standalone",
    lang: "ko",
    background_color: "#ffffff",
    theme_color: "#fc8e39",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
