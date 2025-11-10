/**
 * 스타포스 별 배치 유틸
 *
 * 요구사항 정리
 * 1) 별 5개를 "한 세트"로 본다. (세트 내부 간격은 아주 좁게)
 * 2) 한 줄에는 최대 4세트(= 20개 별)만 배치한다. (세트 간 간격은 넓게)
 * 3) 총 별 개수 N에 대해, 세트 단위로 분해 후 4세트씩 묶어 행(row)들을 만든다.
 *
 * 예시) N = 27
 *  - 세트 분해: [5, 5, 5, 5, 5, 2]
 *  - 줄 묶기(4세트/줄): [[5, 5, 5, 5], [5, 2]]
 *
 * 복잡도
 * - 시간복잡도 O(N) (별 개수에 선형), 공간복잡도 O(N/5) (세트 수 만큼)
 *
 * 사용 팁
 * - 렌더링할 때는 row를 순회하며, 각 세트는 내부 gap을 아주 작게(gap-px),
 *   세트와 세트 사이는 크게(gap-2) 주면 UX 요구사항을 만족할 수 있다.
 */

export const STAR_SET_SIZE = 5; // 세트당 별 개수
export const STAR_SETS_PER_ROW = 4; // 한 줄 최대 세트 수 (4세트 = 20개 별)

/** 안전하게 별 개수를 number로 변환 (음수/NaN 방지) */
export function parseStarCount(input: unknown): number {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.floor(n);
}

/** 총 별 개수를 세트 단위로 분해 (예: 12 → [5, 5, 2]) */
export function makeStarGroups(
  starCount: number,
  setSize: number = STAR_SET_SIZE,
): number[] {
  const fullSets = Math.floor(starCount / setSize);
  const remainder = starCount % setSize;

  const groups = Array(fullSets).fill(setSize);
  if (remainder > 0) groups.push(remainder);
  return groups;
}

/** 세트 배열을 행 단위로 묶기 (한 줄 최대 setsPerRow 세트) */
export function groupSetsIntoRows(
  groups: number[],
  setsPerRow: number = STAR_SETS_PER_ROW,
): number[][] {
  const rows: number[][] = [];
  for (let i = 0; i < groups.length; i += setsPerRow) {
    rows.push(groups.slice(i, i + setsPerRow));
  }
  return rows;
}

/**
 * 최종 API: 아무 입력이나 받아서 바로 "행(row) 배열"을 준다.
 * - totalStars: 별 개수(문자열/숫자 등), 예: "17" 또는 17
 * - setSize: 세트 크기(디폴트 5)
 * - setsPerRow: 줄당 세트 수(디폴트 4 → 20개/줄)
 *
 * 반환 예: [[5,5,5,2]]  // 17개의 경우
 */
export function getStarforce(
  totalStars: unknown,
  setSize: number = STAR_SET_SIZE,
  setsPerRow: number = STAR_SETS_PER_ROW,
): number[][] {
  const count = parseStarCount(totalStars);
  if (count === 0) return [];
  const groups = makeStarGroups(count, setSize);
  return groupSetsIntoRows(groups, setsPerRow);
}
