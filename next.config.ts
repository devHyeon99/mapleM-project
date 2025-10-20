import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false, // 보안상 'X-Powered-By: Next.js' 헤더를 응답에서

  // 개발 환경 데이터 페칭 로깅 설정
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    // AVIF, WebP 등 고압축 포맷 우선 사용
    formats: ["image/avif", "image/webp"],
    // 외부 이미지 서버(Nexon) 요청 최소화를 위한 긴 캐시 시간 설정
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "open.api.nexon.com",
        port: "",
        pathname: "/static/maplestorym/**",
      },
    ],
  },
};

export default nextConfig;
