export const ALL_WORLD_NAME = "전체" as const;

export const WORLD_NAMES = [
  ALL_WORLD_NAME,
  "스카니아",
  "루나",
  "제니스",
  "크로아",
  "유니온",
  "엘리시움",
  "아케인",
] as const;

// 넥슨 API 는 한글 월드명만 받음. 슬러그는 URL 세그먼트와 /public/worlds 이미지 파일명에만 쓰는 표현
const WORLD_SLUGS: Record<string, string> = {
  스카니아: "scania",
  루나: "luna",
  제니스: "zenith",
  크로아: "croa",
  유니온: "union",
  엘리시움: "elysium",
  아케인: "arcane",
};

const WORLD_NAMES_BY_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(WORLD_SLUGS).map(([name, slug]) => [slug, name]),
);

const REAL_WORLD_NAMES: ReadonlySet<string> = new Set(
  WORLD_NAMES.filter((w) => w !== ALL_WORLD_NAME),
);

/** "전체" 를 뺀 실제 월드명인지. 필터·검색 입력 검증에 쓴다. */
export const isRealWorldName = (value: string): boolean =>
  REAL_WORLD_NAMES.has(value);

/**
 * 한글 월드명 → URL 슬러그. 매핑에 없는 월드(넥슨이 새 월드를 추가한 경우)는 한글 그대로 돌려줘 링크가 끊기지 않게 한다.
 */
export const worldSlug = (worldName: string): string =>
  WORLD_SLUGS[worldName] ?? worldName;

/**
 * URL 슬러그 → 넥슨 API 용 한글 월드명. 슬러그가 아니면 입력을 그대로 통과시키므로, 영문화 이전에 공유된
 * 한글 URL(`/character/스카니아/...`)도 계속 동작한다.
 */
export const worldFromSlug = (slug: string): string =>
  WORLD_NAMES_BY_SLUG[slug] ?? slug;

export const worldIconSrc = (worldName: string): string | null => {
  const slug = WORLD_SLUGS[worldName];
  return slug ? `/worlds/${slug}.png` : null;
};
