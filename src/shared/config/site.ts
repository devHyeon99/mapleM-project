export const SITE_NAME = "메엠지지";
export const SITE_HOST = "maplemgg.com";
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_METADATA_BASE = new URL(SITE_URL);

/**
 * OG 이미지 경로. 쿼리의 해시는 next.config.ts 가 파일 내용에서 생성함.
 * 이미지를 교체하면 URL 이 달라져 카카오·페이스북·브라우저 캐시가 자동 갱신됨.
 */
export const OG_IMAGE = `/og-image.png?v=${process.env.NEXT_PUBLIC_OG_VERSION}`;

/** og-image.png 의 실제 픽셀 크기 */
export const OG_IMAGE_SIZE = { width: 1200, height: 628 } as const;

/** 홍보·제보·문의를 받는 창구. 헤더 문의 링크와 길드 홍보 섹션이 같이 씀 */
export const CONTACT_URL = "https://open.kakao.com/me/maplestorymgg";
