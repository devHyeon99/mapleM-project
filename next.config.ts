import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

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
  async redirects() {
    return [
      // 페이지 내부의 permanentRedirect 는 loading.tsx 스트리밍이 시작된 뒤 실행되어
      // 308 대신 200 + meta refresh 로 응답한다. 라우팅 단계에서 처리해야 진짜 308이 나간다.
      {
        source: "/ranking/level",
        destination: "/ranking",
        permanent: true,
      },
      {
        source: "/set-effect",
        destination: "/tools",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
