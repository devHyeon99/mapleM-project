import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

// OG 이미지 내용 해시. 이미지를 교체하면 값이 바뀌므로 크롤러·브라우저 캐시가 자동으로 갱신됨
const ogVersion = createHash("sha1")
  .update(readFileSync(path.join(process.cwd(), "public/og-image.png")))
  .digest("hex")
  .slice(0, 8);

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_OG_VERSION: ogVersion,
  },

  poweredByHeader: false, // 보안상 'X-Powered-By: Next.js' 헤더를 응답에서

  experimental: {
    // 개발 서버 전용. 요청 타임라인과 서버 fetch 캐시 상태를 기록해 MCP get_request_insights 로 조회함
    requestInsights: true,
  },

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
        // app 디렉터리 아이콘 파일 컨벤션. 기본값 max-age=0 이라 방문마다 304 재검증 요청이 나감.
        // HTML 은 내용 해시를 붙인 주소(?icon.<hash>.png)로 불러서 길게 캐시해도 교체가 반영됨
        source: "/:file(favicon\\.ico|icon\\.png|apple-icon\\.png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 기본값 max-age=0 이라 페이지를 열 때마다 304 재검증이 나감.
        // 주소에 해시가 없어 immutable 은 쓰지 않음. 바꾸면 늦어도 하루 뒤 반영됨
        source: "/manifest.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
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
