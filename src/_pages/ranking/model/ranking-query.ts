import { ALL_WORLD_SLUG } from "@/entities/ranking";
import {
  isRealWorldName,
  worldFromSlug,
} from "@/shared/config/constants/worlds";

export interface RankingFilters {
  /** 한글 월드명. 없으면 전체 월드. */
  worldName?: string;
  /** 1-based UI 페이지. 총 페이지 수 반영 전의 요청값이다. */
  page: number;
}

/**
 * `[[...filters]]` 세그먼트를 월드·페이지로 읽는다. 형태가 어긋나면 null 을 돌려
 * 호출부가 404 를 내게 한다. 정규화(`all` 생략, `/1` 생략)는 하지 않는다.
 * 어떤 URL 이 canonical 인지는 `rankingHref` 한 곳만 알고 있으면 되고,
 * 호출부는 그 결과와 요청 경로를 비교해 308 을 낸다.
 *
 * 월드 세그먼트는 슬러그(`scania`)를 받지만, `worldFromSlug` 가 모르는 값을 그대로
 * 통과시키므로 영문화 이전에 공유된 한글 경로(`/ranking/level/스카니아`)도 유효한
 * 요청으로 읽힌 뒤 슬러그 URL 로 308 된다.
 */
// 세그먼트가 이미 디코딩돼 넘어오기도 하고 아니기도 한다. 둘 다 같은 값으로 읽되,
// 깨진 퍼센트 인코딩(`%ZZ`)에 500 을 내지 않도록 실패하면 원문을 쓴다.
const safeDecode = (segment: string) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

export const parseRankingFilters = (
  segments: string[] | undefined,
): RankingFilters | null => {
  if (!segments || segments.length === 0) return { page: 1 };
  if (segments.length > 2) return null;

  const [worldSegment, pageSegment] = segments;

  let worldName: string | undefined;
  if (worldSegment !== ALL_WORLD_SLUG) {
    const decoded = worldFromSlug(safeDecode(worldSegment));
    if (!isRealWorldName(decoded)) return null;
    worldName = decoded;
  }

  if (pageSegment === undefined) return { worldName, page: 1 };

  // 앞자리 0 이나 소수점이 들어간 페이지는 같은 내용의 다른 URL 이 되므로 받지 않는다.
  if (!/^[1-9][0-9]*$/.test(pageSegment)) return null;

  return { worldName, page: Number(pageSegment) };
};
