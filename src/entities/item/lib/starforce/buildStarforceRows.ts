const STAR_SET_SIZE = 5; // 세트당 별 개수
const STAR_SETS_PER_ROW = 4; // 한 줄 최대 세트 수 (4세트 = 20개 별)

/**
 * 별 개수를 렌더링용 행 구조로 변환
 *
 * 별 5개를 한 세트로 묶고(세트 내부 간격은 좁게), 한 줄에 최대 4세트를 배치한다.
 * 예) 27 → [[5, 5, 5, 5], [5, 2]]
 */
export function getStarforce(totalStars: unknown): number[][] {
  const count = Math.floor(Number(totalStars));
  if (!Number.isFinite(count) || count <= 0) return [];

  const groups: number[] = Array(Math.floor(count / STAR_SET_SIZE)).fill(
    STAR_SET_SIZE,
  );
  const remainder = count % STAR_SET_SIZE;
  if (remainder > 0) groups.push(remainder);

  const rows: number[][] = [];
  for (let i = 0; i < groups.length; i += STAR_SETS_PER_ROW) {
    rows.push(groups.slice(i, i + STAR_SETS_PER_ROW));
  }
  return rows;
}
